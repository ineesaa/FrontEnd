"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { addTripAsFavorite } from "@/actions/favorite.actions";
import { Button } from "@/components/ui/button";

export function SaveTripFavoriteButton({ tripId }: { tripId: string }) {
  const [isSaving, setIsSaving] = useState(false);

  async function handleClick() {
    setIsSaving(true);
    const result = await addTripAsFavorite(tripId);
    setIsSaving(false);

    if (!result.success) {
      toast.error("Couldn't save favorite", { description: result.error });
      return;
    }
    toast.success("Saved to favorites.");
  }

  return (
    <Button size="sm" variant="outline" onClick={handleClick} disabled={isSaving}>
      <Heart className="h-4 w-4" />
      {isSaving ? "Saving…" : "Save destination"}
    </Button>
  );
}
