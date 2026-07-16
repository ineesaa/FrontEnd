import { Skeleton } from "@/components/ui/skeleton";

export default function TripDetailsLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Skeleton className="mb-6 h-4 w-20" />
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <div className="space-y-5 rounded-b-lg border border-t-0 border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        <div className="flex gap-6">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex gap-3 border-t border-border pt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
