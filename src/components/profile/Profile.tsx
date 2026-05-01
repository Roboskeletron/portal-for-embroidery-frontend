import {useParams} from "react-router-dom";
import {useBecomeDesigner, useProfile, useUpdateProfile} from "../../api/userApi.ts";
import person from "../../assets/person-square.svg"
import FolderGrid from "./FolderGrid.tsx";
import {useState} from "react";
import {type UserProfileFormValues} from "../../schemas/profileSchema.ts";
import ProfileUpdateForm from "./ProfileUpdateForm.tsx";
import BecomeDesignerForm from "./BecomeDesignerForm.tsx";

function Profile() {
    const {id} = useParams();
    const {isPending, isError, data, error} = useProfile(!id ? null : parseInt(id))
    const profile = data
    const [editModeActive, setEditModeActive] = useState(false)
    const [becomeDesignerModeActive, setBecomeDesignerModeActive] = useState(false)
    const {
        mutate: updateProfile,
        isPending: isUpdatingProfile,
        error: updateError
    } = useUpdateProfile()
    const {
        mutate: becomeDesigner,
        isPending: isBecomingDesigner,
        error: becomeError
    } = useBecomeDesigner()

    const pStyle = {
        fontWeight: 600,
    };

    const onFormSubmit = (data: UserProfileFormValues) => {
        updateProfile({...data})
        setEditModeActive(false)
    };

    const onBecomeDesignerSubmit = (formData: { experiencedSince: string, description: string }) => {
        becomeDesigner(formData, {
            onSuccess: () => setBecomeDesignerModeActive(false)
        });
    };

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="container p-5 overflow-hidden">
            <div className="container">
                {/* Condition 1: Edit Profile Mode */}
                {editModeActive ? (
                        <ProfileUpdateForm
                            initialData={{...profile}}
                            onSubmit={onFormSubmit}
                            isPending={isUpdatingProfile}
                            serverError={updateError?.message}
                        />
                    ) :

                    /* Condition 2: Become Designer Mode */
                    becomeDesignerModeActive ? (
                            <BecomeDesignerForm
                                onSubmit={onBecomeDesignerSubmit}
                                onCancel={() => setBecomeDesignerModeActive(false)}
                                isPending={isBecomingDesigner}
                                serverError={becomeError?.message}
                            />
                        ) :

                        /* Condition 3: Default Profile View */
                        (
                            <div className="row">
                                <div className="col-4">
                                    <div className="mb-3">
                                        <img src={profile!.base64StringImage
                                            ? `data:image/jpeg;base64,${profile!.base64StringImage}` : person}
                                             className="img-fluid rounded shadow-sm"
                                             alt="Profile"/>
                                    </div>
                                    <p><span style={pStyle}>Username:</span> {profile!.username}</p>
                                    <p><span style={pStyle}>First Name:</span> {profile!.firstName}</p>
                                    <p><span style={pStyle}>Last Name:</span> {profile!.lastName}</p>
                                    <p><span style={pStyle}>Email:</span> {profile!.email}</p>
                                    <p><span style={pStyle}>Phone Number:</span> {profile!.phoneNumber}</p>

                                    {profile!.role === "DESIGNER" && profile!.experiencedSince && profile!.description && (
                                        <div className="mt-4 p-3 bg-light rounded">
                                            <h6 className="text-muted text-uppercase fw-bold"
                                                style={{fontSize: '0.8rem'}}>Designer Info</h6>
                                            <p className="mb-1"><span
                                                style={pStyle}>Experience:</span> {new Date(profile!.experiencedSince).toLocaleDateString()}
                                            </p>
                                            <p className="mb-0"><span
                                                style={pStyle}>Description:</span> {profile!.description}</p>
                                        </div>
                                    )}

                                    {/* Buttons: Only visible if viewing OWN profile (!id) */}
                                    {!id && (
                                        <div className="mt-4">
                                            <button className="btn btn-lg btn-outline-success w-100"
                                                    onClick={() => setEditModeActive(true)}>
                                                Edit Profile
                                            </button>

                                            {/* Only show "Become Designer" if user role is USER */}
                                            {profile?.role === "USER" && (
                                                <div className="mt-4">
                                                    <button className="btn btn-lg btn-outline-success w-100"
                                                            onClick={() => setBecomeDesignerModeActive(true)}>
                                                        Become a Designer
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="col-8">
                                    <FolderGrid userId={profile!.id ?? 0}/>
                                </div>
                            </div>
                        )}
            </div>
        </div>
    );
}

export default Profile;