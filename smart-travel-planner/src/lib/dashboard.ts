import { prisma } from "@/lib/prisma";

export interface DashboardStats {
  totalTrips: number;
  upcomingTrips: number;
  totalBudget: number;
  visitedDestinations: number;
  favoritePlaces: number;
  spendingByCategory: { category: string; amount: number }[];
}

interface TripAggregateRow {
  startDate: Date;
  endDate: Date;
  budget: unknown; // Prisma Decimal — coerced via Number() below
}

interface ExpenseCategoryRow {
  category: unknown; // ExpenseCategory enum
  _sum: { amount: unknown };
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const now = new Date();

  const [trips, favoritePlaces, expensesByCategory] = await Promise.all([
    prisma.trip.findMany({
      where: { userId },
      select: { startDate: true, endDate: true, budget: true },
    }) as Promise<TripAggregateRow[]>,
    prisma.favorite.count({ where: { userId } }) as Promise<number>,
    prisma.expense.groupBy({
      by: ["category"],
      where: { trip: { userId } },
      _sum: { amount: true },
    }) as Promise<ExpenseCategoryRow[]>,
  ]);

  const totalTrips = trips.length;
  const upcomingTrips = trips.filter((trip) => trip.startDate > now).length;
  const visitedDestinations = trips.filter((trip) => trip.endDate < now).length;
  const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget), 0);

  const spendingByCategory = expensesByCategory.map((entry) => ({
    category: String(entry.category),
    amount: Number(entry._sum.amount ?? 0),
  }));

  return {
    totalTrips,
    upcomingTrips,
    totalBudget,
    visitedDestinations,
    favoritePlaces,
    spendingByCategory,
  };
}
