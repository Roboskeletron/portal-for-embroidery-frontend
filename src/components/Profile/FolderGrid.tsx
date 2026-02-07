import {useDesignsOfFolder, useFolders} from "../../api/folderApi.ts";
import {useState} from "react";
import {useAuthStore} from "../../store/AuthStore.ts";
import type {FolderViewDto} from "../../types/api-types.ts";
import Folder from "./Folder.tsx";
import Design from "./Design.tsx";

function FolderGrid({userId}: { userId: number }) {
    const role = useAuthStore((state) => state.role)
    const [folderStack, setFolderStack] = useState<FolderViewDto[]>([])
    const currentFolder = folderStack.at(-1)
    const {
        isPending: isFoldersLoading,
        isError: isFoldersError,
        data: folders,
        error: foldersError
    } = useFolders(userId, currentFolder?.id)
    const {
        isPending: isDesignsLoading,
        isError: isDesignsError,
        data: designs,
    } = useDesignsOfFolder(currentFolder?.id);


    const onBackToHomeClick = () => {
        if (!currentFolder) {
            return;
        }

        setFolderStack((prev) => prev.slice(0, -1));
    }

    const onFolderCLick = (id: number) => {
        const folder = folders?.find(folder => folder.id === id)
        if (!folder) {
            console.error("Folder ID {0} not found.", id);
            return;
        }

        setFolderStack((prev) => [...prev, folder]);
    }

    const onCreateFolderClick = () => {

    }

    const onCreateDesignClick = () => {

    }

    if (isFoldersLoading) {
        return <span>Loading...</span>
    }

    if (isFoldersError) {
        return <span>Error: {foldersError.message}</span>
    }

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal px-3">Folders & Designs:
                /{folderStack.map(folder => folder.name).join("/")}</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {folders?.map(folder => <Folder key={folder.id!} id={folder.id!} name={folder.name!}
                                                    onClick={onFolderCLick}/>)}
                    {!isDesignsLoading && !isDesignsError && designs?.map(design => <Design key={design.id!} id={design.id!} name={design.name!} />)}
                </div>
                <div className="row">
                    <div className="px-0 mt-lg-4">
                        <button className="btn btn-outline-secondary me-2" onClick={onBackToHomeClick}>
                            Back To Home
                        </button>
                        <button className="btn btn-outline-success me-2" onClick={onCreateFolderClick}>
                            Create New Folder
                        </button>
                        {!!currentFolder && role === "DESIGNER" &&
                            <button className="btn btn-outline-success" onClick={onCreateDesignClick}>
                                Create New Design
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FolderGrid;