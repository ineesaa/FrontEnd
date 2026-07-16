import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CalendarRange, Wallet, MapPin, Pencil, CloudSun } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatCurrency, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteTripButton } from "@/components/trips/delete-trip-button";
import { SaveTripFavoriteButton } from "@/components/trips/save-favorite-button";

interface TripDetailsPageProps {
  params: Promise<{ tripId: string }>;
}

export default async function TripDetailsPage({ params }: TripDetailsPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== user.id) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Link
        href="/trips"
        className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← All trips
      </Link>

      <Card className="overflow-hidden">
        <div className="relative h-48 w-full bg-muted">
          {trip.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={trip.coverImage}
              alt={trip.destination}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No cover image
            </div>
          )}
        </div>
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-medium tracking-tight">
                {trip.destination}
              </h1>
              <p className="text-sm text-muted-foreground">
                {trip.city}, {trip.country}
              </p>
            </div>
            <div className="flex gap-2">
              <SaveTripFavoriteButton tripId={trip.id} />
              <Button asChild size="sm" variant="secondary">
                <Link href={`/trips/${trip.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <DeleteTripButton tripId={trip.id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <CalendarRange className="h-4 w-4" />
              {formatDateRange(trip.startDate, trip.endDate)}
            </span>
            <span className="flex items-center gap-2 font-mono text-muted-foreground">
              <Wallet className="h-4 w-4" />
              {formatCurrency(Number(trip.budget))} budget
            </span>
          </div>

          {trip.description && (
            <p className="text-sm leading-relaxed text-foreground">
              {trip.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button asChild size="sm" variant="secondary">
              <Link href={`/trips/${trip.id}/itinerary`}>
                <MapPin className="h-4 w-4" />
                Itinerary
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/trips/${trip.id}/budget`}>
                <Wallet className="h-4 w-4" />
                Budget
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/trips/${trip.id}/map`}>
                <MapPin className="h-4 w-4" />
                Map
              </Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/trips/${trip.id}/weather`}>
                <CloudSun className="h-4 w-4" />
                Weather
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
