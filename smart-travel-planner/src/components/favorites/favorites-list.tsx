"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Heart } from "lucide-react";
import { toast } from "sonner";
import { addFavorite } from "@/actions/favorite.actions";
import { Button } from "@/components/ui/button";
import { FavoriteForm } from "@/components/favorites/favorite-form";
import { FavoriteCard, type FavoriteData } from "@/components/favorites/favorite-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { FavoriteInput } from "@/lib/validations/favorite.schema";

export function FavoritesList({ favorites }: { favorites: FavoriteData[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd(values: FavoriteInput) {
    const result = await addFavorite(values);
    if (!result.success) {
      toast.error("Couldn't add favorite", { description: result.error });
      return;
    }
    setIsAdding(false);
    toast.success("Added to favorites.");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {isAdding ? (
        <FavoriteForm
          submitLabel="Add favorite"
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4" />
          Add favorite
        </Button>
      )}

      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Save destinations, attractions, and restaurants you want to remember."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {favorites.map((favorite) => (
            <FavoriteCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </div>
  );
}
