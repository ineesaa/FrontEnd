"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { expenseSchema, type ExpenseInput } from "@/lib/validations/expense.schema";

type ActionResult = { success: true } | { success: false; error: string };

async function getOwnedTrip(tripId: string, userId: string) {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== userId) return null;
  return trip;
}

export async function addExpense(
  tripId: string,
  input: ExpenseInput
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const trip = await getOwnedTrip(tripId, user.id);
  if (!trip) return { success: false, error: "Trip not found." };

  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.expense.create({
    data: {
      tripId,
      category: parsed.data.category,
      title: parsed.data.title,
      amount: parsed.data.amount,
      date: new Date(parsed.data.date),
    },
  });

  revalidatePath(`/trips/${tripId}/budget`);
  revalidatePath("/profile");
  return { success: true };
}

export async function updateExpense(
  expenseId: string,
  input: ExpenseInput
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: { trip: { select: { id: true, userId: true } } },
  });
  if (!expense || expense.trip.userId !== user.id) {
    return { success: false, error: "Expense not found." };
  }

  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.expense.update({
    where: { id: expenseId },
    data: {
      category: parsed.data.category,
      title: parsed.data.title,
      amount: parsed.data.amount,
      date: new Date(parsed.data.date),
    },
  });

  revalidatePath(`/trips/${expense.trip.id}/budget`);
  revalidatePath("/profile");
  return { success: true };
}

export async function deleteExpense(expenseId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: { trip: { select: { id: true, userId: true } } },
  });
  if (!expense || expense.trip.userId !== user.id) {
    return { success: false, error: "Expense not found." };
  }

  await prisma.expense.delete({ where: { id: expenseId } });

  revalidatePath(`/trips/${expense.trip.id}/budget`);
  revalidatePath("/profile");
  return { success: true };
}
