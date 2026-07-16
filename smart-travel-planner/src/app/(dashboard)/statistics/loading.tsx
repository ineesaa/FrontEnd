import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticsLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-16 sm:px-10">
      <Skeleton className="h-8 w-32" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}
