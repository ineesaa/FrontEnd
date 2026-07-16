"use server";

import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type UploadAvatarResult =
  | { success: true; url: string }
  | { success: false; error: string };

export async function uploadAvatar(
  formData: FormData
): Promise<UploadAvatarResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: "You must be signed in to upload a photo.",
    };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, error: "No file received." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: "Use a JPG, PNG, WEBP, or GIF image." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "Image must be smaller than 5MB." };
  }

  const extension = file.type.split("/")[1] ?? "jpg";
  const filename = `${user.id}-${randomUUID()}.${extension}`;

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");
  await mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);

  const url = `/uploads/avatars/${filename}`;

  await prisma.user.update({
    where: { id: user.id },
    data: { image: url },
  });

  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return { success: true, url };
}
