"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validations/profile.schema";
import { updateProfile } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/profile/avatar-upload";

interface ProfileFormProps {
  defaultValues: UpdateProfileInput;
  email: string;
}

export function ProfileForm({ defaultValues, email }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  async function onSubmit(data: UpdateProfileInput) {
    setIsSubmitting(true);
    const result = await updateProfile(data);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error("Couldn't save changes", { description: result.error });
      return;
    }

    toast.success("Profile updated.");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <AvatarUpload
            name={defaultValues.name}
            email={email}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={errors.image?.message}
          />
        )}
      />

      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-xs text-danger">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email-display">Email</Label>
        <Input id="email-display" value={email} disabled />
        <p className="text-xs text-muted-foreground">
          Email can&apos;t be changed yet.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="e.g. Armenia"
          {...register("country")}
        />
        {errors.country && (
          <p className="text-xs text-danger">{errors.country.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="A short line about how you like to travel."
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-xs text-danger">{errors.bio.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/profile")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
