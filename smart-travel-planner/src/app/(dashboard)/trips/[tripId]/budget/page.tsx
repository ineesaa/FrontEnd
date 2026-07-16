import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { BudgetSummary } from "@/components/budget/budget-summary";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { ExpenseTable } from "@/components/budget/expense-table";
import type { ExpenseData } from "@/components/budget/expense-types";

interface BudgetPageProps {
  params: Promise<{ tripId: string }>;
}

interface ExpenseRow {
  id: string;
  category: unknown;
  title: string;
  amount: unknown;
  date: Date;
}

interface TripWithExpenses {
  id: string;
  userId: string;
  destination: string;
  budget: unknown;
  expenses: ExpenseRow[];
}

export default async function BudgetPage({ params }: BudgetPageProps) {
  const { tripId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = (await prisma.trip.findUnique({
    where: { id: tripId },
    include: { expenses: { orderBy: { date: "desc" } } },
  })) as TripWithExpenses | null;
  if (!trip || trip.userId !== user.id) notFound();

  const expenses: ExpenseData[] = trip.expenses.map((expense) => ({
    id: expense.id,
    category: String(expense.category),
    title: expense.title,
    amount: Number(expense.amount),
    date: expense.date,
  }));

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const spendingByCategory = Object.values(
    expenses.reduce<Record<string, { category: string; amount: number }>>(
      (acc, expense) => {
        const existing = acc[expense.category] ?? {
          category: expense.category,
          amount: 0,
        };
        existing.amount += expense.amount;
        acc[expense.category] = existing;
        return acc;
      },
      {}
    )
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Link
        href={`/trips/${trip.id}`}
        className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← {trip.destination}
      </Link>
      <h1 className="mb-6 font-display text-2xl font-medium tracking-tight">
        Budget
      </h1>

      <div className="space-y-8">
        <BudgetSummary budget={Number(trip.budget)} spent={totalSpent} />

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-3 font-display text-base font-medium">
            Spending by category
          </h2>
          <SpendingChart data={spendingByCategory} />
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-medium">Expenses</h2>
          <ExpenseTable tripId={trip.id} expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
