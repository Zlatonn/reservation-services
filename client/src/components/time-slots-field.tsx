import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Minus, Plus } from "lucide-react";

interface TimeSlotFieldProps {
  dayIndex: number;
}

export const TimeSlotField = ({ dayIndex }: TimeSlotFieldProps) => {
  // Access parent form using useFormContext hook
  const { control, register } = useFormContext();

  // Define dynamic time slot field with day index
  const {
    fields: timeSlotFields,
    append: appendTimeSlot,
    remove: removeTimeSlot,
  } = useFieldArray({
    control,
    name: `openingDays.${dayIndex}.timeSlots`,
  });

  return (
    <div className="flex flex-col gap-2 ">
      {timeSlotFields.map((slot, slotIndex) => (
        <div key={slot.id} className="flex items-center justify-between gap-2 sm:gap-60">
          <div className="w-full flex items-center gap-2">
            <Input type="time" {...register(`openingDays.${dayIndex}.timeSlots.${slotIndex}.startAt`)} />
            <Input type="time" {...register(`openingDays.${dayIndex}.timeSlots.${slotIndex}.endAt`)} />
            <Input
              type="number"
              min={0}
              {...register(`openingDays.${dayIndex}.timeSlots.${slotIndex}.available`, {
                valueAsNumber: true, //To reack hook form send number to zod schema
              })}
            />
          </div>

          {slotIndex === 0 ? (
            <Button
              type="button"
              onClick={() => appendTimeSlot({ startAt: "", endAt: "", available: 0 })}
              variant="outline"
              className="w-20 sm:w-32 border-green-400 text-green-400 hover:bg-green-400 hover:text-white cursor-pointer"
            >
              <Plus size={16} />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => removeTimeSlot(slotIndex)}
              variant="outline"
              className="w-20 sm:w-32 border-red-400 text-red-400 hover:bg-red-400 hover:text-white cursor-pointer"
            >
              <Minus size={16} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
