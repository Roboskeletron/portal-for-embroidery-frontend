import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useDeleteComment, useUpdateComment } from "../../api/commentApi";
import type { CommentViewDto } from "../../types/api-types.ts";

interface Props {
    comment: CommentViewDto;
    postId: number;
}

export const CommentItem = ({ comment, postId }: Props) => {
    const { userId, role } = useAuthStore();
    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState(comment.text || "");

    const updateMutation = useUpdateComment(postId);
    const deleteMutation = useDeleteComment(postId);

    // Permission check: Admin or the comment author can delete/edit
    // Note: Assuming 'userFirstName'/'userLastName' is display data,
    // real ownership check should ideally be done via IDs (e.g., comment.userId === user.id)
    // If your DTO doesn't have comment.userId, you might need to rely on Role or just show it if Auth.
    const canModify = userId && (role === "ADMIN");
    // ^ WARNING: matching by name is risky. Ideally your API returns comment.userId.

    const handleUpdate = () => {
        if (text !== comment.text) {
            updateMutation.mutate({ id: comment.id!, text }, {
                onSuccess: () => setIsEditMode(false)
            });
        } else {
            setIsEditMode(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Delete this comment?")) {
            deleteMutation.mutate(comment.id!);
        }
    };

    return (
        <div className="container justify-content-center align-items-center px-5 py-2 w-100">
            <div className="toast show w-100" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <i className="bi bi-person-fill me-2" style={{ color: "#530FAD", fontSize: "1.2rem" }}></i>
                    <strong className="me-auto">
                        {comment.userFirstName} {comment.userLastName}
                    </strong>
                    <small className="text-muted">
                        {new Date(comment.creationDatetime!).toLocaleDateString()}
                    </small>

                    {canModify && (
                        <button
                            type="button"
                            className="btn-close ms-2"
                            aria-label="Close"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                        />
                    )}
                </div>

                <div className="toast-body">
                    {isEditMode ? (
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={text}
                                autoFocus
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') handleUpdate();
                                    if(e.key === 'Escape') setIsEditMode(false);
                                }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleUpdate}
                                disabled={updateMutation.isPending}
                            >
                                <i className="bi bi-check-lg"></i>
                            </button>
                        </div>
                    ) : (
                        <span
                            onDoubleClick={() => canModify && setIsEditMode(true)}
                            style={{ cursor: canModify ? "pointer" : "default" }}
                            title={canModify ? "Double click to edit" : ""}
                        >
                            {comment.text}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};