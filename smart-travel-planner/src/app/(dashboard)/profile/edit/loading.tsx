import { Skeleton } from "@/components/ui/skeleton";

export default function EditProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <Skeleton className="h-96 rounded-lg" />
    </div>
  );
}
