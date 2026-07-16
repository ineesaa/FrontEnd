"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { tripSchema, type TripInput } from "@/lib/validations/trip.schema";
import { createTrip, updateTrip } from "@/actions/trip.actions";
import { COUNTRIES } from "@/lib/countries";
import { CITIES } from "@/lib/cities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

interface TripFormProps {
  tripId?: string;
  defaultValues?: Partial<TripInput>;
}

export function TripForm({ tripId, defaultValues }: TripFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(tripId);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripInput>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      destination: "",
      country: "",
      city: "",
      startDate: "",
      endDate: "",
      budget: 0,
      description: "",
      coverImage: "",
      ...defaultValues,
    },
  });

  const selectedCountry = watch("country");
  const cityOptions = selectedCountry
    ? CITIES.filter(
        (entry) => entry.country.toLowerCase() === selectedCountry.trim().toLowerCase()
      ).map((entry) => entry.city)
    : CITIES.map((entry) => entry.city);

  async function onSubmit(data: TripInput) {
    setIsSubmitting(true);
    const result =
      isEditing && tripId ? await updateTrip(tripId, data) : await createTrip(data);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(isEditing ? "Couldn't save changes" : "Couldn't create trip", {
        description: result.error,
      });
      return;
    }

    toast.success(isEditing ? "Trip updated." : "Trip created.");
    router.push(`/trips/${result.tripId}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="e.g. Paris, France"
            {...register("destination")}
          />
          {errors.destination && (
            <p className="text-xs text-danger">{errors.destination.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Combobox
                id="country"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={COUNTRIES}
                placeholder="France"
              />
            )}
          />
          {errors.country && (
            <p className="text-xs text-danger">{errors.country.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Combobox
                id="city"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={cityOptions}
                placeholder="Paris"
              />
            )}
          />
          {errors.city && (
            <p className="text-xs text-danger">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="startDate">Start date</Label>
          <Input id="startDate" type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-xs text-danger">{errors.startDate.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endDate">End date</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
          {errors.endDate && (
            <p className="text-xs text-danger">{errors.endDate.message}</p>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            step="0.01"
            min="0"
            placeholder="2000"
            {...register("budget")}
          />
          {errors.budget && (
            <p className="text-xs text-danger">{errors.budget.message}</p>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="coverImage">Cover image URL</Label>
          <Input
            id="coverImage"
            placeholder="https://example.com/photo.jpg"
            {...register("coverImage")}
          />
          {errors.coverImage && (
            <p className="text-xs text-danger">{errors.coverImage.message}</p>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What's this trip about?"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-danger">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create trip"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
