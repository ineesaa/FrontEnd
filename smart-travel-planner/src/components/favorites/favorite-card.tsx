"use client";

import { useRouter } from "next/navigation";
import { MapPin, Utensils, Landmark, X } from "lucide-react";
import { toast } from "sonner";
import { removeFavorite } from "@/actions/favorite.actions";
import { FAVORITE_TYPE_LABELS } from "@/lib/constants";

const TYPE_ICONS = {
  DESTINATION: MapPin,
  ATTRACTION: Landmark,
  RESTAURANT: Utensils,
} as const;

export interface FavoriteData {
  id: string;
  type: string;
  name: string;
  location: string | null;
}

export function FavoriteCard({ favorite }: { favorite: FavoriteData }) {
  const router = useRouter();
  const Icon = TYPE_ICONS[favorite.type as keyof typeof TYPE_ICONS] ?? MapPin;

  async function handleRemove() {
    const result = await removeFavorite(favorite.id);
    if (!result.success) {
      toast.error("Couldn't remove favorite", { description: result.error });
      return;
    }
    toast.success("Removed.");
    router.refresh();
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {FAVORITE_TYPE_LABELS[favorite.type] ?? favorite.type}
        </p>
        <p className="text-sm font-medium">{favorite.name}</p>
        {favorite.location && (
          <p className="text-xs text-muted-foreground">{favorite.location}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleRemove}
        aria-label="Remove favorite"
        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-danger"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
