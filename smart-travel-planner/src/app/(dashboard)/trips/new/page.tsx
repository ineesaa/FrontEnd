import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TripForm } from "@/components/trips/trip-form";

export default function NewTripPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a trip</CardTitle>
          <CardDescription>
            Start with the basics — you can add an itinerary and budget once
            it&apos;s saved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TripForm />
        </CardContent>
      </Card>
    </div>
  );
}
