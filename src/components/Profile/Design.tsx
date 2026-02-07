import {NavLink} from "react-router-dom";
import design from "../../assets/design.svg"
import {useState} from "react";
import * as React from "react";

function Design({id, name}:{id: number, name:string}) {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(name);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        setText(e.currentTarget.value);
    }

    return (
        <div className="col">
            <div className="h-50">
                <NavLink to={`/profile/design/${id}`}>
                    <img src={design} className="card-img-top" width={40} height={40} alt="..."/>
                </NavLink>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>}
                </div>
            </div>
        </div>
    );
}

export default Design;