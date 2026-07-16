import { z } from "zod";

export const FAVORITE_TYPES = ["DESTINATION", "ATTRACTION", "RESTAURANT"] as const;

export const favoriteSchema = z.object({
  type: z.enum(FAVORITE_TYPES),
  name: z.string().min(1, "Give it a name.").max(120, "Keep it under 120 characters."),
  location: z.string().max(160, "Keep it under 160 characters.").optional(),
});

export type FavoriteInput = z.infer<typeof favoriteSchema>;
