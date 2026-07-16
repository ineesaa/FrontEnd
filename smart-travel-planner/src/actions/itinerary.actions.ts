"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import {
  activitySchema,
  type ActivityInput,
} from "@/lib/validations/itinerary.schema";

type ActionResult = { success: true } | { success: false; error: string };

async function getOwnedDay(itineraryDayId: string, userId: string) {
  const day = await prisma.itineraryDay.findUnique({
    where: { id: itineraryDayId },
    include: { trip: { select: { id: true, userId: true } } },
  });
  if (!day || day.trip.userId !== userId) return null;
  return day;
}

async function getOwnedActivity(activityId: string, userId: string) {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      itineraryDay: { include: { trip: { select: { id: true, userId: true } } } },
    },
  });
  if (!activity || activity.itineraryDay.trip.userId !== userId) return null;
  return activity;
}

export async function addActivity(
  itineraryDayId: string,
  input: ActivityInput
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const day = await getOwnedDay(itineraryDayId, user.id);
  if (!day) return { success: false, error: "Day not found." };

  const parsed = activitySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const activityCount = await prisma.activity.count({ where: { itineraryDayId } });

  await prisma.activity.create({
    data: {
      itineraryDayId,
      title: parsed.data.title,
      notes: parsed.data.notes || null,
      order: activityCount,
    },
  });

  revalidatePath(`/trips/${day.trip.id}/itinerary`);
  return { success: true };
}

export async function updateActivity(
  activityId: string,
  input: ActivityInput
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const activity = await getOwnedActivity(activityId, user.id);
  if (!activity) return { success: false, error: "Activity not found." };

  const parsed = activitySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.activity.update({
    where: { id: activityId },
    data: { title: parsed.data.title, notes: parsed.data.notes || null },
  });

  revalidatePath(`/trips/${activity.itineraryDay.trip.id}/itinerary`);
  return { success: true };
}

export async function deleteActivity(activityId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const activity = await getOwnedActivity(activityId, user.id);
  if (!activity) return { success: false, error: "Activity not found." };

  await prisma.activity.delete({ where: { id: activityId } });

  revalidatePath(`/trips/${activity.itineraryDay.trip.id}/itinerary`);
  return { success: true };
}

export async function reorderActivities(
  itineraryDayId: string,
  orderedActivityIds: string[]
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const day = await getOwnedDay(itineraryDayId, user.id);
  if (!day) return { success: false, error: "Day not found." };

  await prisma.$transaction(
    orderedActivityIds.map((id, index) =>
      prisma.activity.update({ where: { id }, data: { order: index } })
    )
  );

  revalidatePath(`/trips/${day.trip.id}/itinerary`);
  return { success: true };
}
