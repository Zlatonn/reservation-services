import { useEffect, useState } from "react";

import {
  useCreateService,
  useDeleteService,
  useGetAllServiceNamesByServiceCategoryId,
  useGetService,
  useGetServiceCategories,
  useUpdateService,
} from "@/hooks/use-api";

import { formSchema, FormSchema } from "@/schemas/service-schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceCategories, UseServiceFormProps } from "@/types/types";

export const useServiceForm = ({ officeId, serviceId, isOpen, isEditMode, closeDialog }: UseServiceFormProps) => {
  // Fetch service data
  const { data: serviceData, isLoading: isServiceLoading } = useGetService(serviceId);

  // Another fetching api for create, update, delete
  const { mutate: createService } = useCreateService();
  const { mutate: updateService } = useUpdateService(serviceId);
  const { mutate: deleteService } = useDeleteService(serviceId);

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
      officeId: officeId,
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
        officeId: officeId,
      });
      setCurrentServiceCategoryId("");
      setFormInitialized(true);
    }
  }, [isOpen, isEditMode, officeId, form]);

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

    // Small delay (ensure data is ready) && Reset the form with all data
    setTimeout(() => {
      form.reset({
        id: serviceData.id,
        category: serviceData.category || "",
        name: serviceData.name || "",
        reservableDate: serviceData.reservableDate || "",
        openingDays: serviceData.openingDays || [],
        description: serviceData.description || "",
        officeId: serviceData.officeId || officeId,
      });

      setFormInitialized(true);
    }, 50);
  }, [isOpen, isEditMode, formInitialized, currentServiceCategoryId, serviceData, serviceNamesData, isServiceNamesLoading, form, officeId]);

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
  const onSubmit = (value: FormSchema) => {
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

  return {
    form,
    categoriesData,
    isCategoriesLoading,
    serviceNamesData,
    isServiceNamesLoading,
    selectedDays,
    openingDaysFields,
    onSubmit,
    onDelete,
    handleCategoryChange,
    handleToggleDay,
  };
};
