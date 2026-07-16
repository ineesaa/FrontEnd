import { Skeleton } from "@/components/ui/skeleton";

export default function ItineraryLoading() {
  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="mb-6 h-8 w-32" />
      </div>
      <div className="mx-auto flex max-w-5xl gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-72 shrink-0 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
