import { FormSchema } from "@/schemas/service-schema";
import { UseFormReturn } from "react-hook-form";

export interface Office {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  category: string;
  name: string;
}

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

export interface ServiceFormFieldProps {
  categoriesData: ServiceCategories[] | undefined;
  isCategoriesLoading: boolean;
  serviceNamesData: ServiceNames[] | undefined;
  isServiceNamesLoading: boolean;
  handleCategoryChange: (categoryName: string) => void;
  handleToggleDay: (dayValue: number) => void;
  selectedDays: number[];
  openingDaysFields: { day: number; timeSlots: { start: string; end: string }[] }[];
  form: UseFormReturn<FormSchema>;
}

export interface CategoryFieldProps {
  categoriesData: ServiceCategories[] | undefined;
  isCategoriesLoading: boolean;
  handleCategoryChange: (categoryName: string) => void;
  form: UseFormReturn<FormSchema>;
}

export interface ServiceNameFieldProps {
  serviceNamesData: ServiceNames[] | undefined;
  isServiceNamesLoading: boolean;
  form: UseFormReturn<FormSchema>;
}

export interface ReservableDateFieldProps {
  form: UseFormReturn<FormSchema>;
}

export interface OpeningDaysFieldProps {
  handleToggleDay: (dayValue: number) => void;
  selectedDays: number[];
  openingDaysFields: { day: number; timeSlots: { start: string; end: string }[] }[];
}

export interface TimeSlotFieldProps {
  dayIndex: number;
}

export interface DescriptionFieldProps {
  form: UseFormReturn<FormSchema>;
}

export interface UseServiceFormProps {
  officeId: string;
  serviceId: string;
  isOpen: boolean;
  isEditMode: boolean;
  closeDialog: () => void;
}

export interface UseFormDialogStore {
  isOpen: boolean;
  id: string;
  openDialog: (id?: string) => void;
  closeDialog: () => void;
}

export interface UseOfficeIdStore {
  currentOfficeId: string;
  setOfficeId: (id: string) => void;
}

export interface UsePaginationStore {
  skip: number;
  take: number;
  totalCount: number;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  setTotalCount: (total: number) => void;
}

export interface OfficeApi {
  name: string;
  address?: string;
}

export interface OpenningDayApi {
  day: number;
}

export interface ServiceApi {
  category: string;
  name: string;
  reservableDate: Date | undefined;
  openingDays: OpenningDayApi[];
  description?: string;
}

export interface ServiceCateogryApi {
  name: string;
}

export interface ServiceNameApi {
  name: string;
}
