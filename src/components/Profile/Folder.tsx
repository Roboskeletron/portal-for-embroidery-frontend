import folder from "../../assets/folder.svg"
import {useState} from "react";
import * as React from "react";

function Folder({
    id,
    name,
    onClick,
                } : {id: number, name: string, onClick: (id: number) => void}) {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(name);

    const activateEditMode = () =>{
        setEditMode(true);
    }

    const deactivateEditMode = () =>{
        setEditMode(false);
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    }

    return (
        <div className="col">
            <div className="h-50">
                <img src={folder} className="card-img-top" width={40} height={40}
                     onDoubleClick={() => {onClick(id)}} alt="..."/>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>}
                </div>
            </div>
        </div>
    )
}

export default Folder;