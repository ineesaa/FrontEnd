import { Wallet, Receipt, PiggyBank } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency } from "@/lib/utils";

interface BudgetSummaryProps {
  budget: number;
  spent: number;
}

export function BudgetSummary({ budget, spent }: BudgetSummaryProps) {
  const remaining = budget - spent;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Total budget" value={formatCurrency(budget)} icon={Wallet} />
      <StatCard label="Spent" value={formatCurrency(spent)} icon={Receipt} />
      <StatCard
        label="Remaining"
        value={formatCurrency(remaining)}
        icon={PiggyBank}
        className={remaining < 0 ? "border-danger/50" : undefined}
      />
    </div>
  );
}
