import { redirect } from "next/navigation";
import { Luggage, Globe2, Wallet, Star } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getStatistics } from "@/lib/statistics";
import { formatCurrency } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TripsByMonthChart } from "@/components/statistics/trips-by-month-chart";
import { TripsByCountryChart } from "@/components/statistics/trips-by-country-chart";

export default async function StatisticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const stats = await getStatistics(user.id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-16 sm:px-10">
      <h1 className="font-display text-2xl font-medium tracking-tight">
        Statistics
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Trips created" value={String(stats.tripsCreated)} icon={Luggage} />
        <StatCard
          label="Countries visited"
          value={String(stats.countriesVisited)}
          icon={Globe2}
        />
        <StatCard label="Money spent" value={formatCurrency(stats.moneySpent)} icon={Wallet} />
        <StatCard
          label="Favorite destination"
          value={stats.favoriteDestination ?? "—"}
          icon={Star}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trips by month</CardTitle>
          <CardDescription>When you tend to travel.</CardDescription>
        </CardHeader>
        <CardContent>
          <TripsByMonthChart data={stats.tripsByMonth} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trips by country</CardTitle>
          <CardDescription>Where you&apos;ve been planning to go.</CardDescription>
        </CardHeader>
        <CardContent>
          <TripsByCountryChart data={stats.tripsByCountry} />
        </CardContent>
      </Card>
    </div>
  );
}
