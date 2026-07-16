import { z } from "zod";

export const tripSchema = z
  .object({
    destination: z
      .string()
      .min(2, "Destination is required.")
      .max(120, "Keep it under 120 characters."),
    country: z.string().min(2, "Country is required.").max(80),
    city: z.string().min(2, "City is required.").max(80),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),
    budget: z.coerce.number().positive("Budget must be greater than 0."),
    description: z.string().max(1000, "Keep it under 1000 characters.").optional(),
    coverImage: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.startsWith("/") || /^https?:\/\//i.test(val),
        { message: "Enter a valid image URL." }
      ),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after the start date.",
    path: ["endDate"],
  });

export type TripInput = z.infer<typeof tripSchema>;
