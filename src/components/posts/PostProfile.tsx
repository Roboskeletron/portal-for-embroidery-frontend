import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { usePost, useUpdatePost, useUpdatePostTags } from "../../api/postApi";
// Import your Carousel or a simple Image viewer here
import Carousel from "../common/Carousel";
import { PostUpdateForm } from "./PostUpdateForm.tsx";
import { TagsCreateForm } from "./TagsCreateForm.tsx";
import { CommentList } from "../comments/CommentList.tsx";
// 1. Import the ModelPanel
import ModelPanel from "../common/ModelPanel";

// 2. Add 'MODEL' to the allowed modes
type ViewMode = 'VIEW' | 'EDIT' | 'TAGS' | 'MODEL';

const PostProfile = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuthStore();

    // State for switching views
    const [mode, setMode] = useState<ViewMode>('VIEW');

    // 1. Fetch Data
    const { data: post, isLoading, isError } = usePost(Number(postId));

    // 2. Mutations
    const updatePostMutation = useUpdatePost(Number(postId));
    const updateTagsMutation = useUpdatePostTags(Number(postId));

    // 3. Guards
    if (isLoading) return <div className="text-center p-5">Loading...</div>;
    if (isError || !post) return <div className="text-center p-5 text-danger">Post not found</div>;

    // 4. Handlers
    const handleUpdate = (data: { description: string }) => {
        updatePostMutation.mutate(data, {
            onSuccess: () => setMode('VIEW')
        });
    };

    const handleAddTags = (data: { tags: { title: string }[] }) => {
        updateTagsMutation.mutate(data.tags, {
            onSuccess: () => setMode('VIEW')
        });
    };

    // --- RENDER LOGIC ---

    // A. Edit Mode
    if (mode === 'EDIT') {
        return (
            <PostUpdateForm
                currentDescription={post.description}
                onSave={handleUpdate}
                onCancel={() => setMode('VIEW')}
                isPending={updatePostMutation.isPending}
            />
        );
    }

    // B. Tags Mode
    if (mode === 'TAGS') {
        return (
            <TagsCreateForm
                onSave={handleAddTags}
                onCancel={() => setMode('VIEW')}
                isPending={updateTagsMutation.isPending}
            />
        );
    }

    // C. Model (3D) Mode
    if (mode === 'MODEL') {
        return (
            <ModelPanel
                files={post.files}
                onBack={() => setMode('VIEW')}
            />
        );
    }

    // D. View Mode (Default)
    const canEdit = isAuthenticated && (role === "ADMIN" || role === "DESIGNER");

    return (
        <div className="container p-5 overflow-hidden">
            <div className="row">
                {/* Left Col: Images */}
                <div className="col-md-5 mb-3">
                    {/* Assuming Carousel accepts an array of files.
                        If not, map post.files to simple <img> tags */}
                    {post.files && post.files.length > 0 ? (
                        <Carousel files={post.files} />
                    ) : (
                        <div className="alert alert-secondary">No images available</div>
                    )}
                </div>

                {/* Right Col: Info */}
                <div className="col-md-7">
                    <h1 className="h4 mb-4 fw-normal text-center">{post.designName}</h1>

                    <div className="mb-4 text-end">
                        <p className="fw-bold mb-1">Description:</p>
                        <p className="text-muted">{post.description}</p>
                    </div>

                    <div className="mb-4 text-end">
                        <p className="fw-bold mb-1">Author:</p>
                        <p>{post.designerFirstName} {post.designerLastName}</p>
                    </div>

                    <div className="mb-4 text-end">
                        <p className="fw-bold mb-1">Files:</p>
                        {post.files?.map(file => (
                            <a
                                key={file.id}
                                href={`data:application/octet-stream;base64,${file.base64StringFile}`}
                                download={`${file.name}.${file.extension}`}
                                className="d-block link-success text-decoration-none"
                            >
                                {file.name}.{file.extension}
                            </a>
                        ))}
                    </div>

                    <div className="mb-4 text-end">
                        <p className="fw-bold mb-1">Tags:</p>
                        <div className="d-flex justify-content-end flex-wrap gap-2">
                            {post.tags?.map((tag, idx) => (
                                <span key={idx} className="badge bg-light text-dark border">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-grid gap-2 mt-5">
                        <button className="btn btn-outline-success" onClick={() => setMode('MODEL')}>
                            Show Model (3D)
                        </button>

                        {canEdit ? (
                            <>
                                <button className="btn btn-outline-primary" onClick={() => setMode('TAGS')}>
                                    Add Tags
                                </button>
                                <button className="btn btn-outline-warning" onClick={() => setMode('EDIT')}>
                                    Edit Description
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-outline-secondary" onClick={() => navigate("/designs")}>
                                Back to Designs
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <hr className="my-5"/>

            {/* Comments Section */}
            <CommentList postId={Number(postId)} />
        </div>
    );
};

export default PostProfile;