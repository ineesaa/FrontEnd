"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { favoriteSchema, type FavoriteInput } from "@/lib/validations/favorite.schema";
import { FAVORITE_TYPE_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface FavoriteFormProps {
  submitLabel: string;
  onSubmit: (values: FavoriteInput) => Promise<void>;
  onCancel: () => void;
}

export function FavoriteForm({ submitLabel, onSubmit, onCancel }: FavoriteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FavoriteInput>({
    resolver: zodResolver(favoriteSchema),
    defaultValues: { type: "DESTINATION", name: "", location: "" },
  });

  async function handleFormSubmit(values: FavoriteInput) {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-2"
      noValidate
    >
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="e.g. Eiffel Tower" {...register("name")} />
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="type">Type</Label>
        <Select id="type" {...register("type")}>
          {Object.entries(FAVORITE_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="location">Location (optional)</Label>
        <Input id="location" placeholder="Paris, France" {...register("location")} />
      </div>
      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Adding…" : submitLabel}
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
