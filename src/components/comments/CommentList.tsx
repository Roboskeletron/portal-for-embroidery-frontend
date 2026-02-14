import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useComments } from "../../api/commentApi";
import { CommentCreateForm } from "./CommentCreateForm";
import { CommentItem } from "./CommentItem";

interface Props {
    postId: number;
}

export const CommentList = ({ postId }: Props) => {
    const { isAuthenticated } = useAuthStore();
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, isLoading, isPlaceholderData } = useComments(postId, page, pageSize);

    if (isLoading) {
        return <div className="text-center py-4">Loading comments...</div>;
    }

    const comments = data?.viewDtoList || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div className="container overflow-hidden py-4">
            <h4 className="fw-normal text-center mb-4">Comments ({data?.totalCount || 0})</h4>

            {/* Create Form */}
            {isAuthenticated && (
                <div className="container px-5 mb-4">
                    <CommentCreateForm postId={postId} />
                </div>
            )}

            {/* List */}
            <div className="d-flex flex-column gap-2">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                        />
                    ))
                ) : (
                    <p className="text-center text-muted">No comments yet. Be the first!</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                            >
                                &laquo;
                            </button>
                        </li>

                        {/* Simple page numbers */}
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => {
                                    if (!isPlaceholderData && page < totalPages) {
                                        setPage(p => p + 1);
                                    }
                                }}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};