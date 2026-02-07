import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, type UserProfileFormValues } from "../../schemas/profileSchema";
import { useAuthStore } from "../../store/AuthStore";
import { useState, useEffect } from "react";
import defaultAvatar from "../../assets/person-square.svg";

interface Props {
    initialData?: Partial<UserProfileFormValues>;
    onSubmit: (data: UserProfileFormValues) => void;
    isPending?: boolean;
    serverError?: string;
}

const ProfileUpdateForm = ({ initialData, onSubmit, isPending, serverError }: Props) => {
    const { role } = useAuthStore();
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserProfileFormValues>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: initialData
    });

    // Watch the image field to update preview
    const imageFile = watch("base64StringImage");

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            // Cleanup memory
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageFile]);

    // Set initial preview from existing profile data
    useEffect(() => {
        if (initialData?.base64StringImage) {
            setPreview(`data:image/jpeg;base64,${initialData.base64StringImage}`);
        }
    }, [initialData]);

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="form-card p-5">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Avatar Section */}
                            <div className="text-center mb-4">
                                <div className="d-inline-block position-relative">
                                    <img
                                        src={preview || defaultAvatar}
                                        alt="Profile Preview"
                                        className="avatar-preview mb-3"
                                    />
                                </div>
                                <div>
                                    <label className="btn btn-sm btn-outline-secondary" htmlFor="imageUpload">
                                        Change Photo
                                    </label>
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        {...register("base64StringImage")}
                                        className="d-none" // Hide the ugly default input
                                        accept="image/*"
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="mb-4">
                                <label className="form-label">Username</label>
                                <input
                                    {...register("username")}
                                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                    placeholder="e.g. creative_soul"
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                            </div>

                            {/* First & Last Name Grid */}
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">First Name</label>
                                    <input
                                        {...register("firstName")}
                                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        {...register("lastName")}
                                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                                </div>
                            </div>

                            {/* Contact Info Grid */}
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        {...register("email")}
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        {...register("phoneNumber")}
                                        className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                                </div>
                            </div>

                            {/* Designer Specific Fields */}
                            {role === "DESIGNER" && (
                                <div className="bg-light p-4 rounded-3 mb-4">
                                    <h6 className="text-muted text-uppercase fw-bold mb-3" style={{fontSize: '0.75rem'}}>Designer Details</h6>
                                    <div className="mb-3">
                                        <label className="form-label">Experienced Since</label>
                                        <input
                                            type="datetime-local"
                                            {...register("experiencedSince")}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            {...register("description")}
                                            className="form-control"
                                            rows={4}
                                            placeholder="Tell us about your style..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Server Errors */}
                            {serverError && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <div>{serverError}</div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="btn btn-lg btn-outline-success w-100 mt-2"
                            >
                                {isPending ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdateForm;