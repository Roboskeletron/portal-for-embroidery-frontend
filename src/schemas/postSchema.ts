import {z} from "zod";

export const postCreateSchema = z.object({
    designerId: z.string().optional(),
    designId: z.string().min(1, "Please select a design"),
    description: z.string().min(1, "Description is required"),
    files: z
        .any()
        .refine((files) => files?.length > 0, "At least one file is required.")
});

export type PostCreateFormValues = z.infer<typeof postCreateSchema>;