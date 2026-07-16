"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateActivity, deleteActivity } from "@/actions/itinerary.actions";
import { ActivityForm } from "@/components/itinerary/activity-form";
import type { ActivityInput } from "@/lib/validations/itinerary.schema";

export interface ActivityData {
  id: string;
  title: string;
  notes: string | null;
}

export function ActivityCard({ activity }: { activity: ActivityData }) {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleEdit(values: ActivityInput) {
    const result = await updateActivity(activity.id, values);
    if (!result.success) {
      toast.error("Couldn't save activity", { description: result.error });
      return;
    }
    setIsEditing(false);
    toast.success("Activity updated.");
  }

  async function handleDelete() {
    const result = await deleteActivity(activity.id);
    if (!result.success) {
      toast.error("Couldn't delete activity", { description: result.error });
      return;
    }
    toast.success("Activity removed.");
  }

  if (isEditing) {
    return (
      <ActivityForm
        defaultValues={{ title: activity.title, notes: activity.notes ?? "" }}
        submitLabel="Save"
        onSubmit={handleEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 rounded-md border border-border bg-background p-3 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{activity.title}</p>
        {activity.notes && (
          <p className="mt-0.5 text-xs text-muted-foreground">{activity.notes}</p>
        )}
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit activity"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete activity"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-danger"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
