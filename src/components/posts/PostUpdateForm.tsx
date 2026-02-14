import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postUpdateSchema, type PostUpdateFormValues } from "../../schemas/postSchema";

interface Props {
    currentDescription?: string;
    onSave: (data: PostUpdateFormValues) => void;
    onCancel: () => void;
    isPending: boolean;
}

export const PostUpdateForm = ({ currentDescription, onSave, onCancel, isPending }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<PostUpdateFormValues>({
        resolver: zodResolver(postUpdateSchema),
        defaultValues: { description: currentDescription }
    });

    return (
        <div className="container p-5">
            <h3 className="mb-4 text-center fw-light">Edit Description</h3>
            <form onSubmit={handleSubmit(onSave)}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                        {...register("description")}
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        rows={5}
                    />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary w-50" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success w-50" disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};