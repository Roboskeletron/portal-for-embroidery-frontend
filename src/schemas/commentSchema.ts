import { z } from "zod";

export const commentSchema = z.object({
    text: z.string()
        .min(1, "Comment cannot be empty")
        .max(500, "Comment cannot exceed 500 characters")
});

export type CommentFormValues = z.infer<typeof commentSchema>;