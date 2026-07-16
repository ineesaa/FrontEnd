import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { toDateInputValue } from "@/lib/utils";
import { TripForm } from "@/components/trips/trip-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface EditTripPageProps {
  params: Promise<{ tripId: string }>;
}

export default async function EditTripPage({ params }: EditTripPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== user.id) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit trip</CardTitle>
          <CardDescription>
            Update the details for {trip.destination}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TripForm
            tripId={trip.id}
            defaultValues={{
              destination: trip.destination,
              country: trip.country,
              city: trip.city,
              startDate: toDateInputValue(trip.startDate),
              endDate: toDateInputValue(trip.endDate),
              budget: Number(trip.budget),
              description: trip.description ?? "",
              coverImage: trip.coverImage ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
