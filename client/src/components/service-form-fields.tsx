import { useFieldArray, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { th } from "date-fns/locale";
import { formatThaiDate } from "@/lib/calendar-format";

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CalendarCaption from "@/components/calendar-caption";
import { Input } from "@/components/ui/input";

import { CalendarIcon } from "lucide-react";
import { Minus, Plus } from "lucide-react";

import {
  ServiceFormFieldProps,
  CategoryFieldProps,
  ServiceCategories,
  ServiceNames,
  ServiceNameFieldProps,
  ReservableDateFieldProps,
  OpeningDaysFieldProps,
  TimeSlotFieldProps,
  DescriptionFieldProps,
} from "@/types/types";

// Mock up weekdays
const weekdays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export function ServiceFormFields({
  categoriesData,
  isCategoriesLoading,
  serviceNamesData,
  isServiceNamesLoading,
  handleCategoryChange,
  handleToggleDay,
  selectedDays,
  openingDaysFields,
  form,
}: ServiceFormFieldProps) {
  return (
    <>
      {/* Category field */}
      <CategoryField
        categoriesData={categoriesData}
        isCategoriesLoading={isCategoriesLoading}
        handleCategoryChange={handleCategoryChange}
        form={form}
      />

      {/* Service name field */}
      <ServiceNameField serviceNamesData={serviceNamesData} isServiceNamesLoading={isServiceNamesLoading} form={form} />

      {/* Reservable date field */}
      <ReservableDateField form={form} />

      {/* Opening days field */}
      <OpeningDaysField handleToggleDay={handleToggleDay} selectedDays={selectedDays} openingDaysFields={openingDaysFields} />

      {/* Description field */}
      <DescriptionField form={form} />
    </>
  );
}

// Category Field Component
function CategoryField({ categoriesData, isCategoriesLoading, handleCategoryChange, form }: CategoryFieldProps) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="flex flex-col sm:flex-row items-center gap-2">
          <FormLabel className="text-nowrap w-40">กลุ่มงาน</FormLabel>
          <FormControl className="w-full">
            <Select onValueChange={handleCategoryChange} value={field.value} disabled={isCategoriesLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--กรุณาเลือกประเภทกลุ่มงาน--" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.map((category: ServiceCategories, i: number) => (
                  <SelectItem key={`category-${i}`} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// Service Name Field Component
function ServiceNameField({ serviceNamesData, isServiceNamesLoading, form }: ServiceNameFieldProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="flex flex-col sm:flex-row">
          <FormLabel className="text-nowrap w-40">ชื่อประเภทงาน</FormLabel>
          <FormControl className="flex-grow">
            <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("category") || isServiceNamesLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--กรุณาเลือกประเภทชื่อประเภทงาน--" />
              </SelectTrigger>
              <SelectContent>
                {serviceNamesData?.map((name: ServiceNames, i: number) => (
                  <SelectItem key={`service-${i}`} value={name.name}>
                    {name.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// Reservable Date Field Component
function ReservableDateField({ form }: ReservableDateFieldProps) {
  return (
    <FormField
      control={form.control}
      name="reservableDate"
      render={({ field }) => (
        <FormItem className="flex flex-col sm:flex-row">
          <FormLabel className="text-nowrap w-40">เริ่มจองได้ตั้งแต่วันที่</FormLabel>
          <Popover>
            <FormControl>
              <div className="w-fit sm:w-full">
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                    {field.value ? formatThaiDate(new Date(field.value)) : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
              </div>
            </FormControl>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={th}
                components={{ Caption: CalendarCaption }}
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    const isoString = selectedDate.toISOString().split("T")[0];
                    field.onChange(isoString);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}

// Opening Days Field Component
function OpeningDaysField({ handleToggleDay, selectedDays, openingDaysFields }: OpeningDaysFieldProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-start">
      <FormLabel className="text-nowrap w-40">วันที่เปิดทำงาน</FormLabel>
      <div className="w-full flex flex-col gap-2">
        {weekdays.map((day, value) => {
          const openingDayFieldIndex = openingDaysFields.findIndex((field) => field.day === value);
          return (
            <div key={`day-${value}`} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox checked={selectedDays.includes(value)} onCheckedChange={() => handleToggleDay(value)} />
                <FormLabel>{day}</FormLabel>
              </div>
              {openingDayFieldIndex !== -1 && <TimeSlotField key={`timeslot-${openingDayFieldIndex}`} dayIndex={openingDayFieldIndex} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TimeSlotField = ({ dayIndex }: TimeSlotFieldProps) => {
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

// Description Field Component
function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="flex flex-col sm:flex-row">
          <FormLabel className="text-nowrap w-40">คำแนะนำ</FormLabel>
          <FormControl>
            <Textarea className="resize-none" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
