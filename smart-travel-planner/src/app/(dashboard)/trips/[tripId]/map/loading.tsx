import { Skeleton } from "@/components/ui/skeleton";

export default function MapLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-6 h-8 w-20" />
      <Skeleton className="h-96 rounded-lg" />
    </div>
  );
}
