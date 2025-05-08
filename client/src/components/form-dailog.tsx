import { useEffect, useState } from "react";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { th } from "date-fns/locale";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Container from "@/components/container";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CalendarCaption from "@/components/calendar-caption";
import { TimeSlotField } from "@/components/time-slots-field";

import { CalendarIcon } from "lucide-react";

import { formatThaiDate } from "@/lib/calendar-format";

import {
  useCreateService,
  useDeleteService,
  useGetAllServiceNamesByServiceCategoryId,
  useGetService,
  useGetServiceCategories,
  useUpdateService,
} from "@/hooks/use-api";
import { useOfficeIdStore } from "@/stores/use-officeId-store";
import { useFormDialogStore } from "@/stores/use-form-dialog-store";

// Mock up weekdays
const weekdays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

// Create schemas
// Time slot schema
const timeSlotSchema = z.object({
  id: z.string().optional(),
  startAt: z
    .string()
    .min(1, "Start time is required")
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"),
  endAt: z
    .string()
    .min(1, "End time is required")
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"),
  available: z.number().int().min(1, "Must be at least 1"),
  openingDayId: z.string().optional(),
});

// Opening schema
const openingDaySchema = z.object({
  id: z.string().optional(),
  day: z.number().int().min(0, "Day must be between 0 and 6").max(6, "Day must be between 0 and 6"),
  timeSlots: z.array(timeSlotSchema).min(1, "At least one timeslot is required"),
  serviceId: z.string().optional(),
});

// Form schema
const formSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  reservableDate: z.string({ required_error: "reservableDate is required" }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  openingDays: z.array(openingDaySchema).min(1, "At least one opening day is required"),
  description: z.string().optional(),
  officeId: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface ServiceCategories {
  id: string;
  name: string;
}

interface ServiceNames {
  id: string;
  name: string;
}

export function FormDialog() {
  // Get current office ID
  const { currentOfficeId } = useOfficeIdStore();

  // Import form dialog
  const { id, isOpen, closeDialog } = useFormDialogStore();

  // State to track edit mode
  const isEditMode = Boolean(id);

  // Fetch service data
  const { data: serviceData, isLoading: isServiceLoading } = useGetService(id);

  // Another fetching api for create, update, delete
  const { mutate: createService } = useCreateService();
  const { mutate: updateService } = useUpdateService(id);
  const { mutate: deleteService } = useDeleteService(id);

  // State for selected category ID
  const [currentServiceCategoryId, setCurrentServiceCategoryId] = useState<string>("");

  // Fetch categories data
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetServiceCategories();

  // Fetch service name data
  const { data: serviceNamesData, isLoading: isServiceNamesLoading } = useGetAllServiceNamesByServiceCategoryId(currentServiceCategoryId);

  // Create form using react hook form with empty value
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      name: "",
      reservableDate: "",
      openingDays: [],
      description: "",
      officeId: currentOfficeId,
    },
  });

  // Define dynamic opening day field
  const {
    fields: openingDaysFields,
    append: appendOpeningDay,
    remove: removeOpeningDay,
  } = useFieldArray({ control: form.control, name: "openingDays" });

  // Flag to prevent multiple initialization
  const [formInitialized, setFormInitialized] = useState(false);

  // Reset form when dialog opens/closes and clear initialization
  useEffect(() => {
    if (!isOpen) {
      setFormInitialized(false);
      form.reset();
      return;
    }
    // Initialize with empty form for create mode
    if (!isEditMode) {
      form.reset({
        category: "",
        name: "",
        reservableDate: "",
        openingDays: [],
        description: "",
        officeId: currentOfficeId,
      });
      setCurrentServiceCategoryId("");
      setFormInitialized(true);
    }
  }, [isOpen, isEditMode, currentOfficeId, form]);

  // Handle edit mode initialization
  useEffect(() => {
    // Only proceed if dialog is open, edit mode, not initialized, and have all required data
    if (!isOpen || !isEditMode || formInitialized || isServiceLoading || isCategoriesLoading || !serviceData || !categoriesData) {
      return;
    }

    // Find the category ID based on the category name from service data
    const categoryObj = categoriesData.find((c: ServiceCategories) => c.name === serviceData.category);

    if (categoryObj) {
      // Set the category ID first => service names can load
      setCurrentServiceCategoryId(categoryObj.id);
    }
  }, [isOpen, isEditMode, formInitialized, isServiceLoading, isCategoriesLoading, serviceData, categoriesData]);

  // Initialize form after service names are loaded
  useEffect(() => {
    // Only proceed if dialog is open, edit mode, not initialized, category ID is set, and service names are loaded
    if (
      !isOpen ||
      !isEditMode ||
      formInitialized ||
      !currentServiceCategoryId ||
      isServiceNamesLoading ||
      !serviceData ||
      !serviceNamesData
    ) {
      return;
    }

    // Little delay && Reset the form with all data
    setTimeout(() => {
      form.reset({
        id: serviceData.id,
        category: serviceData.category || "",
        name: serviceData.name || "",
        reservableDate: serviceData.reservableDate || "",
        openingDays: serviceData.openingDays || [],
        description: serviceData.description || "",
        officeId: serviceData.officeId || currentOfficeId,
      });

      setFormInitialized(true);
    }, 50);
  }, [
    isOpen,
    isEditMode,
    formInitialized,
    currentServiceCategoryId,
    serviceData,
    serviceNamesData,
    isServiceNamesLoading,
    form,
    currentOfficeId,
  ]);

  // Define array of selected day from openingDayFields
  const selectedDays = openingDaysFields.map((f) => f.day);

  // Handle toggle day
  const handleToggleDay = (dayValue: number) => {
    // Check current check status
    const isSelected = selectedDays.includes(dayValue);
    if (isSelected) {
      // Find index of openingDaysFields to remove
      const fieldIndexToRemove = openingDaysFields.findIndex((d) => d.day === dayValue);
      removeOpeningDay(fieldIndexToRemove);
    } else {
      appendOpeningDay({
        day: dayValue,
        timeSlots: [{ startAt: "", endAt: "", available: 0 }],
      });
    }
  };

  // Handle submit form
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    if (isEditMode) {
      console.log("update", value);
      updateService({
        ...value,
        reservableDate: new Date(value.reservableDate),
      });

      alert("อัพเดทข้อมูลสำเร็จ");
    } else {
      createService({
        ...value,
        reservableDate: new Date(value.reservableDate),
      });
      alert("บันทึกข้อมูลสำเร็จ");
    }
    closeDialog();
  };

  // Handle delete
  const onDelete = () => {
    deleteService();
    alert("ลบข้อมูลสำเร็จ");
    closeDialog();
  };

  // Handle category change
  const handleCategoryChange = (categoryName: string) => {
    form.setValue("category", categoryName);
    form.setValue("name", ""); // Reset the service name when category changes

    if (!categoriesData) return;

    const found = categoriesData.find((c: ServiceCategories) => c.name === categoryName);
    if (found) {
      setCurrentServiceCategoryId(found.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{id ? "แก้ไขประเภทงาน" : "เพิ่มประเภทงาน"}</DialogTitle>
          <DialogDescription />

          {/* Content */}
          <Container className="px-5">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Cetegory field*/}
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

                {/* Service name field*/}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row">
                      <FormLabel className="text-nowrap w-40">ชื่อประเภทงาน</FormLabel>
                      <FormControl className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!form.watch("category") || isServiceNamesLoading}
                        >
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

                {/* Reservable date field */}
                <FormField
                  control={form.control}
                  name="reservableDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row">
                      <FormLabel className="text-nowrap w-40">เริ่มจองได้ตั้งแต่วันที่</FormLabel>
                      {/* Calendar button */}
                      <Popover>
                        <FormControl>
                          <div className="w-fit sm:w-full">
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? formatThaiDate(new Date(field.value)) : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </div>
                        </FormControl>

                        {/* Calendar content */}
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

                {/* Openning day field*/}
                <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-start">
                  <FormLabel className="text-nowrap w-40">วันที่เปิดทำงาน</FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    {weekdays.map((day, value) => {
                      // Find openingDayFieldIndex
                      const openingDayFieldIndex = openingDaysFields.findIndex((field) => field.day === value);
                      return (
                        <div key={`day-${value}`} className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox checked={selectedDays.includes(value)} onCheckedChange={() => handleToggleDay(value)} />
                            <FormLabel>{day}</FormLabel>
                          </div>
                          {openingDayFieldIndex !== -1 && (
                            <TimeSlotField key={`timeslot-${openingDayFieldIndex}`} dayIndex={openingDayFieldIndex} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description field */}
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

                {/* Handle form  button */}
                <div className="flex justify-between">
                  {/* Delete button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onDelete}
                    className={`${
                      id ? "visible" : "invisible"
                    } border-primary text-primary hover:text-white hover:bg-primary cursor-pointer`}
                  >
                    ลบประเภทงาน
                  </Button>

                  {/* Create/Edit button */}
                  <Button type="submit" className="border-[1px] hover:text-primary hover:bg-white hover:border-primary cursor-pointer">
                    บันทึก
                  </Button>
                </div>
              </form>
            </FormProvider>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
