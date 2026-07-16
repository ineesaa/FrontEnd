import { z } from "zod";

export const EXPENSE_CATEGORIES = [
  "HOTEL",
  "FOOD",
  "TRANSPORTATION",
  "ENTERTAINMENT",
  "SHOPPING",
  "OTHER",
] as const;

export const expenseSchema = z.object({
  category: z.enum(EXPENSE_CATEGORIES),
  title: z.string().min(1, "Give the expense a name.").max(120, "Keep it under 120 characters."),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  date: z.string().min(1, "Date is required."),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
