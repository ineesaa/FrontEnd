import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { DayColumn } from "@/components/itinerary/day-column";

interface ItineraryPageProps {
  params: Promise<{ tripId: string }>;
}

interface ActivityRow {
  id: string;
  title: string;
  notes: string | null;
}

interface ItineraryDayRow {
  id: string;
  dayNumber: number;
  date: Date;
  activities: ActivityRow[];
}

interface TripWithItinerary {
  id: string;
  userId: string;
  destination: string;
  itineraryDays: ItineraryDayRow[];
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = (await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      itineraryDays: {
        orderBy: { dayNumber: "asc" },
        include: { activities: { orderBy: { order: "asc" } } },
      },
    },
  })) as TripWithItinerary | null;
  if (!trip || trip.userId !== user.id) notFound();

  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/trips/${trip.id}`}
          className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← {trip.destination}
        </Link>
        <h1 className="mb-6 font-display text-2xl font-medium tracking-tight">
          Itinerary
        </h1>
      </div>

      <div className="mx-auto flex max-w-5xl gap-4 overflow-x-auto pb-4">
        {trip.itineraryDays.map((day) => (
          <DayColumn
            key={day.id}
            dayId={day.id}
            dayNumber={day.dayNumber}
            date={day.date}
            activities={day.activities}
          />
        ))}
      </div>
    </div>
  );
}
