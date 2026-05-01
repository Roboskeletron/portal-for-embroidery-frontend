import type {PostForListDto} from "../../types/api-types.ts";
import {NavLink} from "react-router-dom";
import {useAuthStore} from "../../store/AuthStore.ts";
import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";
import {useDeletePost, useDislikePost, useLikePost} from "../../api/postApi.ts";

function Post({post}: {post: PostForListDto}) {
    const { isAuthenticated, userId, role } = useAuthStore();

    const likeMutation = useLikePost();
    const dislikeMutation = useDislikePost();
    const deleteMutation = useDeletePost();

    const isPending = likeMutation.isPending || dislikeMutation.isPending || deleteMutation.isPending;

    const textStyle = {
        // color: '#ffd200',
        color: '#6F0AAA',
    };

    const canDelete = isAuthenticated && role === 'ADMIN';

    const onLikeClicked = () =>{
        if (userId) {
            likeMutation.mutate({ postId: post.id!, userId: userId });
        }
    }

    const onDislikeClicked = () =>{
        if (userId) {
            dislikeMutation.mutate({ postId: post.id!, userId: userId });
        }
    }

    const onDeleteClicked = () =>{
        if (window.confirm(`Are you sure you want to delete "${post.designName}"?`)) {
            deleteMutation.mutate(post.id!);
        }
    }

    return (
        <div className="col">
            <div className="card h-100 shadow-sm border-0">
                <img
                    src={`data:image/jpeg;base64,${post.designBase64StringImage}`}
                    className="card-img-top"
                    alt={post.designName}
                    style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={post.designName}>
                        {post.designName}
                    </h5>
                    <p className="card-text text-muted small flex-grow-1 line-clamp-2">
                        {post.description}
                    </p>
                </div>

                <div className="card-body border-top bg-light">
                    <div className="row align-items-center">
                        {/* Left Side: Actions */}
                        <div className="col-8 d-flex gap-2">
                            <NavLink
                                to={`/designs/${post.id}`}
                                className="btn btn-sm btn-outline-success"
                            >
                                More
                            </NavLink>

                            {canDelete && (
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={onDeleteClicked}
                                    disabled={isPending}
                                >
                                    {deleteMutation.isPending ? "..." : "Delete"}
                                </button>
                            )}
                        </div>

                        {/* Right Side: Likes */}
                        <div className="col-4 text-end">
                            {isAuthenticated ? (
                                // Interactive Heart
                                <img
                                    src={post.liked ? heartFill : heart}
                                    alt={post.liked ? "Unlike" : "Like"}
                                    onClick={post.liked ? onDislikeClicked : onLikeClicked}
                                    style={{
                                        cursor: isPending ? "wait" : "pointer",
                                        opacity: isPending ? 0.5 : 1,
                                        width: "20px"
                                    }}
                                />
                            ) : (
                                // Static Heart (Not logged in)
                                <img src={heart} alt="Likes" style={{ width: "20px" }} />
                            )}

                            <span className="px-2 fw-bold" style={textStyle}>
                                {post.countLikes}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;