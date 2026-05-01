import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const becomeDesignerSchema = z.object({
    experiencedSince: z.string().min(1, "Please select a date"),
    description: z.string().min(10, "Please provide a short description about yourself"),
});

type BecomeDesignerFormValues = z.infer<typeof becomeDesignerSchema>;

interface Props {
    onSubmit: (data: BecomeDesignerFormValues) => void;
    onCancel: () => void;
    isPending?: boolean;
    serverError?: string;
}

export const BecomeDesignerForm = ({ onSubmit, onCancel, isPending, serverError }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BecomeDesignerFormValues>({
        resolver: zodResolver(becomeDesignerSchema),
    });

    return (
        <div className="card shadow-sm border-0 p-5 mt-4">
            <h3 className="text-center mb-4">Become a Designer</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <label className="form-label fw-bold">Experienced Since</label>
                    <input
                        type="datetime-local"
                        {...register("experiencedSince")}
                        className={`form-control ${errors.experiencedSince ? "is-invalid" : ""}`}
                    />
                    {errors.experiencedSince && <div className="invalid-feedback">{errors.experiencedSince.message}</div>}
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Tell us about your embroidery experience and style..."
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>

                {serverError && (
                    <div className="alert alert-danger">{serverError}</div>
                )}

                <div className="d-flex gap-2 mt-4">
                    <button type="button" className="btn btn-outline-secondary w-50" onClick={onCancel} disabled={isPending}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary w-50" style={{ backgroundColor: "#530FAD" }} disabled={isPending}>
                        {isPending ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BecomeDesignerForm;