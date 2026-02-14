import folder from "../../assets/folder.svg"
import {useState} from "react";
import * as React from "react";
import {useFolder, useUpdateFolder} from "../../api/folderApi.ts";

function Folder({
    id,
    onClick,
                } : {id: number, onClick: (id: number) => void}) {
    const  { isPending, isError, data, error } = useFolder(id)
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(data?.name);
    const { mutate } = useUpdateFolder(id)

    const activateEditMode = () =>{
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        setText(undefined);

        if (!text) {
            return;
        }

        mutate({name: text})
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <img src={folder} className="card-img-top" width={40} height={40}
                     onDoubleClick={() => {onClick(id)}} alt="..."/>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{data?.name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text ?? data?.name}/>}
                </div>
            </div>
        </div>
    )
}

export default Folder;