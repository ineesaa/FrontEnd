import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight">
          We couldn&apos;t find that
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          It may have been deleted, or it might belong to someone else.
        </p>
      </div>
      <Button asChild>
        <Link href="/trips">Back to trips</Link>
      </Button>
    </div>
  );
}
