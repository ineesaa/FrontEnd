import Link from "next/link";
import { CalendarRange, Wallet } from "lucide-react";
import { formatCurrency, formatDateRange } from "@/lib/utils";

interface TripCardProps {
  id: string;
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  coverImage: string | null;
}

export function TripCard({
  id,
  destination,
  country,
  startDate,
  endDate,
  budget,
  coverImage,
}: TripCardProps) {
  return (
    <Link
      href={`/trips/${id}`}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={destination}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No cover image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-medium tracking-tight">
          {destination}
        </h3>
        <p className="text-sm text-muted-foreground">{country}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarRange className="h-3.5 w-3.5" />
            {formatDateRange(startDate, endDate)}
          </span>
          <span className="flex items-center gap-1.5 font-mono">
            <Wallet className="h-3.5 w-3.5" />
            {formatCurrency(budget)}
          </span>
        </div>
      </div>
    </Link>
  );
}
