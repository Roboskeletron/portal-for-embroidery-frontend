import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, type CommentFormValues } from "../../schemas/commentSchema";
import { useCreateComment } from "../../api/commentApi";
import { useAuthStore } from "../../store/AuthStore";

interface Props {
    postId: number;
}

export const CommentCreateForm = ({ postId }: Props) => {
    const { userId } = useAuthStore();
    const { mutate, isPending } = useCreateComment(postId);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema)
    });

    const onSubmit = (data: CommentFormValues) => {
        if (!userId) return;

        mutate({
            postId: postId,
            userId: userId, // Assuming user ID is in your store
            text: data.text
        }, {
            onSuccess: () => reset()
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="form-floating mb-2">
                <textarea
                    className={`form-control ${errors.text ? "is-invalid" : ""}`}
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    {...register("text")}
                />
                <label>Write a comment...</label>
                {errors.text && <div className="invalid-feedback">{errors.text.message}</div>}
            </div>
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-success"
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "Send"}
                </button>
            </div>
        </form>
    );
};