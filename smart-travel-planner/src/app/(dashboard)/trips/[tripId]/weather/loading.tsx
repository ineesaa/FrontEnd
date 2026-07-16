import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-6 h-8 w-24" />
      <div className="space-y-6">
        <Skeleton className="h-28 rounded-lg" />
        <div>
          <Skeleton className="mb-3 h-5 w-28" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
