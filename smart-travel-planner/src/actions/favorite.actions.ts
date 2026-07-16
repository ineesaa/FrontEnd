"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { favoriteSchema, type FavoriteInput } from "@/lib/validations/favorite.schema";

type ActionResult = { success: true } | { success: false; error: string };

export async function addFavorite(input: FavoriteInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const parsed = favoriteSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      type: parsed.data.type,
      name: parsed.data.name,
      location: parsed.data.location || null,
    },
  });

  revalidatePath("/favorites");
  revalidatePath("/profile");
  return { success: true };
}

export async function removeFavorite(favoriteId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const favorite = await prisma.favorite.findUnique({ where: { id: favoriteId } });
  if (!favorite || favorite.userId !== user.id) {
    return { success: false, error: "Favorite not found." };
  }

  await prisma.favorite.delete({ where: { id: favoriteId } });

  revalidatePath("/favorites");
  revalidatePath("/profile");
  return { success: true };
}

export async function addTripAsFavorite(tripId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== user.id) {
    return { success: false, error: "Trip not found." };
  }

  const existing = await prisma.favorite.findFirst({
    where: { userId: user.id, type: "DESTINATION", name: trip.destination },
  });
  if (existing) {
    return { success: false, error: "Already in your favorites." };
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      type: "DESTINATION",
      name: trip.destination,
      location: `${trip.city}, ${trip.country}`,
      latitude: trip.latitude,
      longitude: trip.longitude,
    },
  });

  revalidatePath("/favorites");
  revalidatePath("/profile");
  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}
