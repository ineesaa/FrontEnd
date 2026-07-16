import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { geocodePlace } from "@/services/maps.service";
import { MapLoader } from "@/components/maps/map-loader";
import { DistanceFromMe } from "@/components/maps/distance-from-me";

interface MapPageProps {
  params: Promise<{ tripId: string }>;
}

interface TripWithCoords {
  id: string;
  userId: string;
  destination: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

export default async function MapPage({ params }: MapPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  let trip = (await prisma.trip.findUnique({
    where: { id: tripId },
  })) as TripWithCoords | null;
  if (!trip || trip.userId !== user.id) notFound();

  if (trip.latitude === null || trip.longitude === null) {
    const coordinates = await geocodePlace(`${trip.city}, ${trip.country}`);
    if (coordinates) {
      trip = (await prisma.trip.update({
        where: { id: trip.id },
        data: coordinates,
      })) as TripWithCoords;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Link
        href={`/trips/${trip.id}`}
        className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← {trip.destination}
      </Link>
      <h1 className="mb-6 font-display text-2xl font-medium tracking-tight">
        Map
      </h1>

      {trip.latitude !== null && trip.longitude !== null ? (
        <>
          <MapLoader
            latitude={trip.latitude}
            longitude={trip.longitude}
            label={trip.destination}
            description={`${trip.city}, ${trip.country}`}
          />
          <DistanceFromMe latitude={trip.latitude} longitude={trip.longitude} />
        </>
      ) : (
        <div className="flex h-96 items-center justify-center rounded-lg border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
          Couldn&apos;t locate this destination on the map. Double-check the
          city/country on the trip and try again.
        </div>
      )}
    </div>
  );
}
