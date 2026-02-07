import {NavLink} from "react-router-dom";
import design from "../../assets/design.svg"
import {useState} from "react";
import * as React from "react";
import {useDesign, useUpdateDesign} from "../../api/desingApi.ts";

function Design({id}:{id: number}) {
    const { isPending, isError, data, error } = useDesign(id);
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(data?.name);
    const { mutate } = useUpdateDesign(id)

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        setText(undefined);

        if (!text) {
            return;
        }

        mutate({name: text});
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        setText(e.currentTarget.value);
    }

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="col">
            <div className="h-50">
                <NavLink to={`/profile/design/${id}`}>
                    <img src={design} className="card-img-top" width={40} height={40} alt="..."/>
                </NavLink>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{data?.name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text ?? data?.name}/>}
                </div>
            </div>
        </div>
    );
}

export default Design;