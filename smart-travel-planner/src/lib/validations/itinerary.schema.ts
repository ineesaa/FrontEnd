import { z } from "zod";

export const activitySchema = z.object({
  title: z
    .string()
    .min(1, "Give the activity a name.")
    .max(120, "Keep it under 120 characters."),
  notes: z.string().max(500, "Keep notes under 500 characters.").optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;
