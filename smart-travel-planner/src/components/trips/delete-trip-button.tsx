"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteTrip } from "@/actions/trip.actions";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function DeleteTripButton({ tripId }: { tripId: string }) {
  const router = useRouter();

  async function handleConfirm() {
    const result = await deleteTrip(tripId);
    if (!result.success) {
      toast.error("Couldn't delete trip", { description: result.error });
      return;
    }
    toast.success("Trip deleted.");
    router.push("/trips");
    router.refresh();
  }

  return (
    <ConfirmDialog
      triggerLabel="Delete"
      title="Delete this trip?"
      description="This removes the trip along with its itinerary and expenses. This can't be undone."
      confirmLabel="Delete trip"
      onConfirm={handleConfirm}
    />
  );
}
