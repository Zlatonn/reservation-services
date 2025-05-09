import { z } from "zod";

// Time slot schema
export const timeSlotSchema = z.object({
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
export const openingDaySchema = z.object({
  id: z.string().optional(),
  day: z.number().int().min(0, "Day must be between 0 and 6").max(6, "Day must be between 0 and 6"),
  timeSlots: z.array(timeSlotSchema).min(1, "At least one timeslot is required"),
  serviceId: z.string().optional(),
});

// Form schema
export const formSchema = z.object({
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

export type FormSchema = z.infer<typeof formSchema>;

export interface ServiceCategories {
  id: string;
  name: string;
}

export interface ServiceNames {
  id: string;
  name: string;
}

export interface ServiceData {
  id: string;
  category: string;
  name: string;
  reservableDate: string;
  openingDays: {
    id: string;
    day: number;
    timeSlots: {
      id: string;
      startAt: string;
      endAt: string;
      available: number;
      openingDayId: string;
    }[];
    serviceId: string;
  }[];
  description?: string;
  officeId: string;
}
