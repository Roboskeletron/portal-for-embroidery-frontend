import {z} from "zod";

export const postCreateSchema = z.object({
    designerId: z.string().optional(),
    designId: z.string().min(1, "Please select a design"),
    description: z.string().min(1, "Description is required"),
    files: z
        .any()
        .refine((files) => files?.length > 0, "At least one file is required.")
});

export const postUpdateSchema = z.object({
    description: z.string().min(1, "Description cannot be empty"),
});

export const tagsCreateSchema = z.object({
    tags: z.array(
        z.object({
            title: z.string().min(1, "Tag cannot be empty")
        })
    ).min(1, "Add at least one tag")
});

export type PostCreateFormValues = z.infer<typeof postCreateSchema>;
export type PostUpdateFormValues = z.infer<typeof postUpdateSchema>;
export type TagsCreateFormValues = z.infer<typeof tagsCreateSchema>;