import { z } from "zod";

const hasLetter = /[a-zA-Zа-яА-Я]/;
const noNumbers = /^([^0-9]*)$/;
const noLetters = /^([^a-zA-Zа-яА-Я]*)$/;

export const userProfileSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .regex(hasLetter, "Must contain at least one letter"),

    firstName: z.string()
        .min(1, "First Name is required")
        .regex(noNumbers, "Must not contain numbers"),

    lastName: z.string()
        .min(1, "Last Name is required")
        .regex(noNumbers, "Must not contain numbers"),

    email: z.email("Invalid email format"),

    phoneNumber: z.string()
        .min(7, "Phone number too short")
        .max(11, "Phone number too long")
        .regex(noLetters, "Must not contain letters"),

    experiencedSince: z.string().optional(),
    description: z.string().optional(),
    base64StringImage: z.any().optional(),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;