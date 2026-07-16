"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, type ExpenseInput } from "@/lib/validations/expense.schema";
import { EXPENSE_CATEGORY_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface ExpenseFormProps {
  defaultValues?: ExpenseInput;
  submitLabel: string;
  onSubmit: (values: ExpenseInput) => Promise<void>;
  onCancel?: () => void;
}

export function ExpenseForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultValues ?? {
      category: "OTHER",
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  async function handleFormSubmit(values: ExpenseInput) {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid gap-3 sm:grid-cols-2"
      noValidate
    >
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title">Expense</Label>
        <Input id="title" placeholder="e.g. Hotel deposit" {...register("title")} />
        {errors.title && <p className="text-xs text-danger">{errors.title.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="category">Category</Label>
        <Select id="category" {...register("category")}>
          {Object.entries(EXPENSE_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        {errors.category && (
          <p className="text-xs text-danger">{errors.category.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="amount">Amount (USD)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="100"
          {...register("amount")}
        />
        {errors.amount && (
          <p className="text-xs text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && <p className="text-xs text-danger">{errors.date.message}</p>}
      </div>
      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" size="sm" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
