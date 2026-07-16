"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateExpense, deleteExpense } from "@/actions/expense.actions";
import { EXPENSE_CATEGORY_LABELS } from "@/lib/constants";
import { formatCurrency, toDateInputValue } from "@/lib/utils";
import { ExpenseForm } from "@/components/budget/expense-form";
import type { ExpenseInput } from "@/lib/validations/expense.schema";
import type { ExpenseData } from "@/components/budget/expense-types";

export function ExpenseRow({ expense }: { expense: ExpenseData }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  async function handleEdit(values: ExpenseInput) {
    const result = await updateExpense(expense.id, values);
    if (!result.success) {
      toast.error("Couldn't save expense", { description: result.error });
      return;
    }
    setIsEditing(false);
    toast.success("Expense updated.");
    router.refresh();
  }

  async function handleDelete() {
    const result = await deleteExpense(expense.id);
    if (!result.success) {
      toast.error("Couldn't delete expense", { description: result.error });
      return;
    }
    toast.success("Expense removed.");
    router.refresh();
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <ExpenseForm
          defaultValues={{
            category: expense.category as ExpenseInput["category"],
            title: expense.title,
            amount: expense.amount,
            date: toDateInputValue(expense.date),
          }}
          submitLabel="Save"
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{expense.title}</p>
        <p className="text-xs text-muted-foreground">
          {EXPENSE_CATEGORY_LABELS[expense.category] ?? expense.category} ·{" "}
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(expense.date)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="font-mono text-sm">{formatCurrency(expense.amount)}</span>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit expense"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete expense"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-danger"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
