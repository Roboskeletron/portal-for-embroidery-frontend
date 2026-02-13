import {useAuthStore} from "../../store/AuthStore.ts";
import {useDesigns} from "../../api/desingApi.ts";
import {type PostCreateFormValues, postCreateSchema} from "../../schemas/postSchema.ts";
import {useCreatePost} from "../../api/postApi.ts";
import {useDesigners} from "../../api/userApi.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import type {FileDto, PostDto} from "../../types/api-types.ts";
import {fileToBase64} from "../../utils/fileHelpers.ts";

function PostCreateForm() {
    const { role, userId } = useAuthStore();
    const navigate = useNavigate();
    const {
        data: designs,
        isLoading: designsLoading
    } = useDesigns();

    const {
        mutate,
        isPending,
        error: serverError
    } = useCreatePost();

    const {
        data: designers,
        isLoading: designersLoading
    } = useDesigners()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PostCreateFormValues>({
        resolver: zodResolver(postCreateSchema),
    });

    const files = watch("files");
    const fileCount = files?.length || 0;

    const onSubmit = async (formData: PostCreateFormValues) => {
        try {
            // A. Process Files to Base64 (Parallel)
            const fileList = Array.from(formData.files as FileList);
            const processedFiles: FileDto[] = await Promise.all(
                fileList.map(async (file) => ({
                    name: file.name.split('.').slice(0, -1).join('.'), // Remove extension
                    extension: file.name.split('.').pop() || "jpg",
                    base64StringFile: await fileToBase64(file),
                    designId: Number(formData.designId) // Associate file with design if needed
                }))
            );

            // B. Prepare DTO
            const payload: PostDto = {
                designId: Number(formData.designId),
                designerId: role === "ADMIN" ? Number(formData.designerId) : userId ?? 0,
                description: formData.description,
                files: processedFiles
            };

            mutate(payload, {
                onSuccess: () => {
                    navigate("/designs");
                }
            });

        } catch (err) {
            console.error("Failed to process files", err);
        }
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 p-5">
                        <h3 className="text-center mb-4 fw-light">Create New Post</h3>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* --- Designer Select (Admin Only) --- */}
                            {role === "ADMIN" && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Select Designer</label>
                                    <select
                                        {...register("designerId")}
                                        className={`form-select ${errors.designerId ? "is-invalid" : ""}`}
                                        disabled={designersLoading}
                                    >
                                        <option value="">
                                            {designersLoading ? "Loading designers..." : "-- Choose a Designer --"}
                                        </option>
                                        {designers?.map((designer) => (
                                            <option key={designer.id} value={designer.id}>
                                                {designer.firstName} {designer.lastName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.designerId && (
                                        <div className="invalid-feedback">{errors.designerId.message}</div>
                                    )}
                                </div>
                            )}

                            {/* --- Design Select --- */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Select Design</label>
                                <select
                                    {...register("designId")}
                                    className={`form-select ${errors.designId ? "is-invalid" : ""}`}
                                    disabled={designsLoading}
                                >
                                    <option value="">
                                        {designsLoading ? "Loading designs..." : "-- Choose a Design --"}
                                    </option>
                                    {designs?.map((design) => (
                                        <option key={design.id} value={design.id}>
                                            {design.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.designId && (
                                    <div className="invalid-feedback">{errors.designId.message}</div>
                                )}
                            </div>

                            {/* --- File Input --- */}
                            <div className="mb-4">
                                <label className="form-label fw-bold d-flex justify-content-between">
                                    <span>Select Files</span>
                                    {fileCount > 0 && (
                                        <span className="badge bg-secondary rounded-pill">
                                            {fileCount} selected
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    className={`form-control ${errors.files ? "is-invalid" : ""}`}
                                    {...register("files")}
                                    accept="image/*"
                                />
                                {errors.files && (
                                    <div className="invalid-feedback">{String(errors.files.message)}</div>
                                )}
                            </div>

                            {/* --- Description --- */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Description</label>
                                <textarea
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                    rows={4}
                                    placeholder="Describe your embroidery post..."
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description.message}</div>
                                )}
                            </div>

                            {/* --- Server Error Message --- */}
                            {serverError && (
                                <div className="alert alert-danger" role="alert">
                                    {serverError.message || "An error occurred while creating the post."}
                                </div>
                            )}

                            {/* --- Submit Button --- */}
                            <button
                                type="submit"
                                disabled={isPending || designsLoading}
                                className="btn btn-success w-100 py-2 fw-bold"
                                style={{ backgroundColor: "#530FAD", borderColor: "#530FAD" }}
                            >
                                {isPending ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Creating...
                                    </span>
                                ) : (
                                    "Create Post"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCreateForm;