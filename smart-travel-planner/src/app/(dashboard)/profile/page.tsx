import { redirect } from "next/navigation";
import { Luggage, CalendarClock, Wallet, MapPin, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getDashboardStats } from "@/lib/dashboard";
import { formatCurrency } from "@/lib/utils";
import { ProfileCard } from "@/components/profile/profile-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) redirect("/login");

  const [user, stats] = await Promise.all([
    prisma.user.findUnique({ where: { id: sessionUser.id } }),
    getDashboardStats(sessionUser.id),
  ]);
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-16 sm:px-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total trips" value={String(stats.totalTrips)} icon={Luggage} />
        <StatCard label="Upcoming" value={String(stats.upcomingTrips)} icon={CalendarClock} />
        <StatCard
          label="Total budget"
          value={formatCurrency(stats.totalBudget)}
          icon={Wallet}
        />
        <StatCard label="Visited" value={String(stats.visitedDestinations)} icon={MapPin} />
        <StatCard label="Favorites" value={String(stats.favoritePlaces)} icon={Heart} />
      </div>

      <ProfileCard
        name={user.name}
        email={user.email}
        country={user.country}
        bio={user.bio}
        image={user.image}
      />

      <Card>
        <CardHeader>
          <CardTitle>Spending by category</CardTitle>
          <CardDescription>Across all your trips.</CardDescription>
        </CardHeader>
        <CardContent>
          <SpendingChart data={stats.spendingByCategory} />
        </CardContent>
      </Card>
    </div>
  );
}
