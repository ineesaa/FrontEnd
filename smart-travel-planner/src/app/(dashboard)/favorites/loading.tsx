import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Skeleton className="mb-6 h-8 w-32" />
      <Skeleton className="mb-4 h-9 w-32" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
