import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { FavoritesList } from "@/components/favorites/favorites-list";
import type { FavoriteData } from "@/components/favorites/favorite-card";

interface FavoriteRow {
  id: string;
  type: unknown;
  name: string;
  location: string | null;
}

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const favoritesRaw = (await prisma.favorite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })) as FavoriteRow[];

  const favorites: FavoriteData[] = favoritesRaw.map((favorite) => ({
    id: favorite.id,
    type: String(favorite.type),
    name: favorite.name,
    location: favorite.location,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <h1 className="mb-6 font-display text-2xl font-medium tracking-tight">
        Favorites
      </h1>
      <FavoritesList favorites={favorites} />
    </div>
  );
}
