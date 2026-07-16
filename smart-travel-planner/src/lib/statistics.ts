import { prisma } from "@/lib/prisma";

export interface StatisticsData {
  tripsCreated: number;
  countriesVisited: number;
  moneySpent: number;
  favoriteDestination: string | null;
  tripsByMonth: { month: string; count: number }[];
  tripsByCountry: { country: string; count: number }[];
}

interface TripStatRow {
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
}

interface ExpenseSumRow {
  _sum: { amount: unknown };
}

export async function getStatistics(userId: string): Promise<StatisticsData> {
  const now = new Date();

  const [trips, expenseSum] = await Promise.all([
    prisma.trip.findMany({
      where: { userId },
      select: { destination: true, country: true, startDate: true, endDate: true },
    }) as Promise<TripStatRow[]>,
    prisma.expense.aggregate({
      where: { trip: { userId } },
      _sum: { amount: true },
    }) as Promise<ExpenseSumRow>,
  ]);

  const tripsCreated = trips.length;

  const visitedTrips = trips.filter((trip) => trip.endDate < now);
  const countriesVisited = new Set(visitedTrips.map((trip) => trip.country)).size;

  const moneySpent = Number(expenseSum._sum.amount ?? 0);

  const destinationCounts = new Map<string, number>();
  for (const trip of trips) {
    destinationCounts.set(
      trip.destination,
      (destinationCounts.get(trip.destination) ?? 0) + 1
    );
  }
  let favoriteDestination: string | null = null;
  let maxDestinationCount = 0;
  for (const [destination, count] of destinationCounts) {
    if (count > maxDestinationCount) {
      maxDestinationCount = count;
      favoriteDestination = destination;
    }
  }

  const monthBuckets = new Map<string, { label: string; count: number }>();
  for (const trip of trips) {
    const sortKey = `${trip.startDate.getFullYear()}-${String(
      trip.startDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(trip.startDate);
    const bucket = monthBuckets.get(sortKey) ?? { label, count: 0 };
    bucket.count += 1;
    monthBuckets.set(sortKey, bucket);
  }
  const tripsByMonth = Array.from(monthBuckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, bucket]) => ({ month: bucket.label, count: bucket.count }));

  const countryCounts = new Map<string, number>();
  for (const trip of trips) {
    countryCounts.set(trip.country, (countryCounts.get(trip.country) ?? 0) + 1);
  }
  const tripsByCountry = Array.from(countryCounts.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    tripsCreated,
    countriesVisited,
    moneySpent,
    favoriteDestination,
    tripsByMonth,
    tripsByCountry,
  };
}
