"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  activitySchema,
  type ActivityInput,
} from "@/lib/validations/itinerary.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ActivityFormProps {
  defaultValues?: ActivityInput;
  submitLabel: string;
  onSubmit: (values: ActivityInput) => Promise<void>;
  onCancel: () => void;
}

export function ActivityForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
}: ActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: defaultValues ?? { title: "", notes: "" },
  });

  async function handleFormSubmit(values: ActivityInput) {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-2 rounded-md border border-border bg-background p-3"
      noValidate
    >
      <div>
        <Input
          autoFocus
          placeholder="Activity name"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-danger">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Notes (optional)"
          className="min-h-[60px]"
          {...register("notes")}
        />
        {errors.notes && (
          <p className="mt-1 text-xs text-danger">{errors.notes.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
