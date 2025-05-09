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
import { toast } from "react-toastify";

export const useServiceForm = ({ officeId, serviceId, isOpen, isEditMode, closeDialog }: UseServiceFormProps) => {
  // State for selected category ID
  const [currentServiceCategoryId, setCurrentServiceCategoryId] = useState<string>("");

  // API hook with error handling
  const { data: serviceData, isLoading: isServiceLoading, error: serviceError } = useGetService(serviceId);
  const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useGetServiceCategories();
  const {
    data: serviceNamesData,
    isLoading: isServiceNamesLoading,
    error: serviceNamesError,
  } = useGetAllServiceNamesByServiceCategoryId(currentServiceCategoryId);
  const { mutate: createService, isPending: isCreating, error: createError } = useCreateService();
  const { mutate: updateService, isPending: isUpdating, error: updateError } = useUpdateService(serviceId);
  const { mutate: deleteService, isPending: isDeleting, error: deleteError } = useDeleteService(serviceId);

  // Handle API errors
  useEffect(() => {
    if (serviceError) {
      toast.error(`ไม่สามารถโหลดข้อมูลได้: ${serviceError.message}`);
    }

    if (categoriesError) {
      toast.error(`ไม่สามารถโหลดประเภทกลุ่มงานได้: ${categoriesError.message}`);
    }

    if (serviceNamesError && currentServiceCategoryId) {
      toast.error(`ไม่สามารถโหลดชื่อประเภทงานได้: ${serviceNamesError.message}`);
    }

    if (createError) {
      toast.error(`ไม่สามารถบันทึกข้อมูลได้: ${createError.message}`);
    }

    if (updateError) {
      toast.error(`ไม่สามารถอัพเดทข้อมูลได้: ${updateError.message}`);
    }

    if (deleteError) {
      toast.error(`ไม่สามารถลบข้อมูลได้: ${deleteError.message}`);
    }
  }, [serviceError, categoriesError, serviceNamesError, createError, updateError, deleteError, currentServiceCategoryId]);

  // Calculate overall loading state
  const isLoading = isServiceLoading || isCategoriesLoading || isServiceNamesLoading || isCreating || isUpdating || isDeleting;

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

      toast.success("อัพเดทข้อมูลสำเร็จ");
    } else {
      createService({
        ...value,
        reservableDate: new Date(value.reservableDate),
      });
      toast.success("บันทึกข้อมูลสำเร็จ");
    }
    closeDialog();
  };

  // Handle delete
  const onDelete = () => {
    const confirmed = confirm("ต้องการลบประเภทงานนี้จริงใช่ไหม?");
    if (!confirmed) return;

    deleteService();
    toast.success("ลบข้อมูลสำเร็จ");
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
    isLoading,
  };
};
