"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { tripSchema, type TripInput } from "@/lib/validations/trip.schema";
import { geocodePlace } from "@/services/maps.service";

function getDateRangeDays(startDate: Date, endDate: Date) {
  const days: { dayNumber: number; date: Date }[] = [];
  const current = new Date(startDate);
  let dayNumber = 1;
  while (current <= endDate) {
    days.push({ dayNumber, date: new Date(current) });
    current.setDate(current.getDate() + 1);
    dayNumber += 1;
  }
  return days;
}

type TripActionResult =
  | { success: true; tripId: string }
  | { success: false; error: string };

export async function createTrip(input: TripInput): Promise<TripActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "You must be signed in to create a trip." };
  }

  const parsed = tripSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const { destination, country, city, startDate, endDate, budget, description, coverImage } =
    parsed.data;

  const coordinates = await geocodePlace(`${city}, ${country}`);

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      destination,
      country,
      city,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget,
      description: description || null,
      coverImage: coverImage || null,
      latitude: coordinates?.latitude ?? null,
      longitude: coordinates?.longitude ?? null,
      itineraryDays: {
        create: getDateRangeDays(new Date(startDate), new Date(endDate)),
      },
    },
  });

  revalidatePath("/trips");
  revalidatePath("/profile");

  return { success: true, tripId: trip.id };
}

export async function updateTrip(
  tripId: string,
  input: TripInput
): Promise<TripActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "You must be signed in to edit a trip." };
  }

  const existing = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: "Trip not found." };
  }

  const parsed = tripSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const { destination, country, city, startDate, endDate, budget, description, coverImage } =
    parsed.data;

  const coordinates = await geocodePlace(`${city}, ${country}`);

  await prisma.trip.update({
    where: { id: tripId },
    data: {
      destination,
      country,
      city,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget,
      description: description || null,
      coverImage: coverImage || null,
      latitude: coordinates?.latitude ?? null,
      longitude: coordinates?.longitude ?? null,
    },
  });

  const days = getDateRangeDays(new Date(startDate), new Date(endDate));
  await Promise.all(
    days.map((day) =>
      prisma.itineraryDay.upsert({
        where: { tripId_dayNumber: { tripId, dayNumber: day.dayNumber } },
        create: { tripId, dayNumber: day.dayNumber, date: day.date },
        update: { date: day.date },
      })
    )
  );

  revalidatePath("/trips");
  revalidatePath(`/trips/${tripId}`);
  revalidatePath("/profile");

  return { success: true, tripId };
}

type DeleteTripResult = { success: true } | { success: false; error: string };

export async function deleteTrip(tripId: string): Promise<DeleteTripResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "You must be signed in to delete a trip." };
  }

  const existing = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: "Trip not found." };
  }

  await prisma.trip.delete({ where: { id: tripId } });

  revalidatePath("/trips");
  revalidatePath("/profile");

  return { success: true };
}
