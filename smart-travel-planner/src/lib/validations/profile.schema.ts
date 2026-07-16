import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Keep it under 80 characters."),
  country: z.string().max(80, "Keep it under 80 characters.").optional(),
  bio: z.string().max(280, "Bio must be 280 characters or fewer.").optional(),
  image: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith("/") || /^https?:\/\//i.test(val),
      { message: "Enter a valid image URL." }
    ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
