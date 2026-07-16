import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getWeather } from "@/services/weather.service";
import { WeatherWidget } from "@/components/weather/weather-widget";
import { ForecastList } from "@/components/weather/forecast-list";

interface WeatherPageProps {
  params: Promise<{ tripId: string }>;
}

interface TripCoords {
  id: string;
  userId: string;
  destination: string;
  latitude: number | null;
  longitude: number | null;
}

export default async function WeatherPage({ params }: WeatherPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = (await prisma.trip.findUnique({
    where: { id: tripId },
  })) as TripCoords | null;
  if (!trip || trip.userId !== user.id) notFound();

  const weather =
    trip.latitude !== null && trip.longitude !== null
      ? await getWeather(trip.latitude, trip.longitude)
      : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Link
        href={`/trips/${trip.id}`}
        className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← {trip.destination}
      </Link>
      <h1 className="mb-6 font-display text-2xl font-medium tracking-tight">
        Weather
      </h1>

      {weather ? (
        <div className="space-y-6">
          <WeatherWidget current={weather.current} />
          <div>
            <h2 className="mb-3 font-display text-base font-medium">
              5-day forecast
            </h2>
            <ForecastList forecast={weather.forecast} />
          </div>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
          Couldn&apos;t load weather for this trip. Make sure
          WEATHER_API_KEY is set in .env, and visit the Map tab once first
          if this trip doesn&apos;t have a resolved location yet.
        </div>
      )}
    </div>
  );
}
