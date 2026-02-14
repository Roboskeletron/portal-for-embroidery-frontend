import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tagsCreateSchema, type TagsCreateFormValues } from "../../schemas/postSchema";

interface Props {
    onSave: (data: TagsCreateFormValues) => void;
    onCancel: () => void;
    isPending: boolean;
}

export const TagsCreateForm = ({ onSave, onCancel, isPending }: Props) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<TagsCreateFormValues>({
        resolver: zodResolver(tagsCreateSchema),
        defaultValues: { tags: [{ title: "" }] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "tags" });

    return (
        <div className="container p-5">
            <h3 className="mb-4 text-center fw-light">Add Tags</h3>
            <form onSubmit={handleSubmit(onSave)}>
                {fields.map((field, index) => (
                    <div key={field.id} className="input-group mb-2">
                        <span className="input-group-text">#</span>
                        <input
                            {...register(`tags.${index}.title`)}
                            className="form-control"
                            placeholder="Tag name"
                        />
                        <button type="button" className="btn btn-outline-danger" onClick={() => remove(index)}>X</button>
                    </div>
                ))}

                <div className="mb-3">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => append({ title: "" })}>
                        + Add another tag
                    </button>
                    {errors.tags && <div className="text-danger small mt-1">{errors.tags.message}</div>}
                </div>

                <div className="d-flex gap-2 mt-4">
                    <button type="button" className="btn btn-outline-secondary w-50" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-success w-50" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Tags"}
                    </button>
                </div>
            </form>
        </div>
    );
};