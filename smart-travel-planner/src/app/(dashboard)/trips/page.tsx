import Link from "next/link";
import { Plus, MapPinned } from "lucide-react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/trips/trip-card";
import { EmptyState } from "@/components/shared/empty-state";

interface TripListRow {
  id: string;
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
  budget: unknown;
  coverImage: string | null;
}

export default async function TripsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trips = (await prisma.trip.findMany({
    where: { userId: user.id },
    orderBy: { startDate: "asc" },
  })) as TripListRow[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium tracking-tight">
          Trips
        </h1>
        <Button asChild size="sm">
          <Link href="/trips/new">
            <Plus className="h-4 w-4" />
            New trip
          </Link>
        </Button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={MapPinned}
          title="No trips yet"
          description="Create your first trip to start building an itinerary, tracking a budget, and more."
          action={
            <Button asChild size="sm">
              <Link href="/trips/new">Create a trip</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              destination={trip.destination}
              country={trip.country}
              startDate={trip.startDate}
              endDate={trip.endDate}
              budget={Number(trip.budget)}
              coverImage={trip.coverImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
