"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validations/profile.schema";

type UpdateProfileResult = { success: true } | { success: false; error: string };

export async function updateProfile(
  input: UpdateProfileInput
): Promise<UpdateProfileResult> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      error: "You must be signed in to update your profile.",
    };
  }

  const parsed = updateProfileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const { name, country, bio, image } = parsed.data;

  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      country: country || null,
      bio: bio || null,
      image: image || null,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return { success: true };
}
