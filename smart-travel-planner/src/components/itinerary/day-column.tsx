"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addActivity, reorderActivities } from "@/actions/itinerary.actions";
import { Button } from "@/components/ui/button";
import { ActivityCard, type ActivityData } from "@/components/itinerary/activity-card";
import { ActivityForm } from "@/components/itinerary/activity-form";
import type { ActivityInput } from "@/lib/validations/itinerary.schema";

interface DayColumnProps {
  dayId: string;
  dayNumber: number;
  date: Date;
  activities: ActivityData[];
}

export function DayColumn({ dayId, dayNumber, date, activities: activitiesProp }: DayColumnProps) {
  const router = useRouter();
  const [activities, setActivities] = useState(activitiesProp);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setActivities(activitiesProp);
  }, [activitiesProp]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = activities.findIndex((a) => a.id === active.id);
    const newIndex = activities.findIndex((a) => a.id === over.id);
    const reordered = arrayMove(activities, oldIndex, newIndex);
    setActivities(reordered); // optimistic

    const result = await reorderActivities(dayId, reordered.map((a) => a.id));
    if (!result.success) {
      toast.error("Couldn't save the new order", { description: result.error });
      setActivities(activitiesProp); // revert
    }
  }

  async function handleAdd(values: ActivityInput) {
    const result = await addActivity(dayId, values);
    if (!result.success) {
      toast.error("Couldn't add activity", { description: result.error });
      return;
    }
    setIsAdding(false);
    toast.success("Activity added.");
    router.refresh();
  }

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Day {dayNumber}
        </p>
        <p className="font-display text-sm font-medium">
          {format(date, "EEE, MMM d")}
        </p>
      </div>

      <div className="flex-1 space-y-2 p-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activities.map((a) => a.id)}
            strategy={verticalListSortingStrategy}
          >
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </SortableContext>
        </DndContext>

        {activities.length === 0 && !isAdding && (
          <p className="px-1 py-3 text-center text-xs text-muted-foreground">
            Nothing planned yet.
          </p>
        )}

        {isAdding ? (
          <ActivityForm
            submitLabel="Add"
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            Add activity
          </Button>
        )}
      </div>
    </div>
  );
}
