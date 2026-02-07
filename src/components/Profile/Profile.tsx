import {useParams} from "react-router-dom";
import {useProfile, useUpdateProfile} from "../../api/userApi.ts";
import person from "../../assets/person-square.svg"
import FolderGrid from "./FolderGrid.tsx";
import {useState} from "react";
import {type UserProfileFormValues} from "../../schemas/profileSchema.ts";
import ProfileUpdateForm from "./ProfileUpdateForm.tsx";

function Profile() {
    const {id} = useParams();
    const {isPending, isError, data, error} = useProfile(!id ? null : parseInt(id))
    const profile = data
    const [editModeActive, setEditModeActive] = useState(false)
    const {
        mutate: updateProfile,
        isPending: isUpdatingProfile,
        error: updateError
    } = useUpdateProfile()

    const pStyle = {
        fontWeight: 600,
    };

    const onFormSubmit = (data: UserProfileFormValues) => {
        updateProfile({...data})
        setEditModeActive(false)
    };

    const onEditClicked = () =>{
        setEditModeActive(true)
    }

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="container p-5 overflow-hidden">
            <div className="container">
                {editModeActive || isUpdatingProfile || updateError
                    ? <ProfileUpdateForm initialData={{...profile}} onSubmit={onFormSubmit} isPending={isUpdatingProfile} serverError={updateError?.message} />
                    : <div className="row">
                        <div className="col-4">
                            <div className="mb-3">
                                <img src={profile!.base64StringImage
                                    ? `data:image/jpeg;base64,${profile!.base64StringImage}` : person}
                                     className="img-fluid"
                                     alt=""/>
                            </div>
                            <p><span style={pStyle}>Username:</span> {profile!.username}</p>
                            <p></p>
                            <p><span style={pStyle}>First Name:</span> {profile!.firstName}</p>
                            <p></p>
                            <p><span style={pStyle}>Last Name:</span> {profile!.lastName}</p>
                            <p></p>
                            <p><span style={pStyle}>Email:</span> {profile!.email}</p>
                            <p></p>
                            <p><span style={pStyle}>Phone Number:</span> {profile!.phoneNumber}</p>
                            <p></p>
                            {profile!.role === "DESIGNER" && profile!.experiencedSince && profile!.description &&
                                <>
                                    <p><span style={pStyle}>Experience:</span> {profile!.experiencedSince}</p>
                                    <p></p>
                                    <p><span style={pStyle}>Description:</span> {profile!.description}</p>
                                    <p></p>
                                </>}
                            {!id && <button className="btn btn-lg btn-outline-success w-100 mt-2" onClick={onEditClicked}>Edit</button>}
                        </div>
                        <div className="col-8">
                            {<FolderGrid userId={profile!.id ?? 0}/>}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Profile;