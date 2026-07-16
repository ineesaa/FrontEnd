"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Receipt } from "lucide-react";
import { toast } from "sonner";
import { addExpense } from "@/actions/expense.actions";
import { Button } from "@/components/ui/button";
import { ExpenseForm } from "@/components/budget/expense-form";
import { ExpenseRow } from "@/components/budget/expense-row";
import { EmptyState } from "@/components/shared/empty-state";
import type { ExpenseInput } from "@/lib/validations/expense.schema";
import type { ExpenseData } from "@/components/budget/expense-types";

export function ExpenseTable({
  tripId,
  expenses,
}: {
  tripId: string;
  expenses: ExpenseData[];
}) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd(values: ExpenseInput) {
    const result = await addExpense(tripId, values);
    if (!result.success) {
      toast.error("Couldn't add expense", { description: result.error });
      return;
    }
    setIsAdding(false);
    toast.success("Expense added.");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {isAdding ? (
        <div className="rounded-md border border-border bg-background p-4">
          <ExpenseForm
            submitLabel="Add expense"
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      ) : (
        <Button size="sm" variant="secondary" onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4" />
          Add expense
        </Button>
      )}

      {expenses.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No expenses yet"
          description="Log hotel, food, transportation, and other costs to track your budget."
        />
      ) : (
        <div className="divide-y divide-border rounded-md border border-border">
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}
