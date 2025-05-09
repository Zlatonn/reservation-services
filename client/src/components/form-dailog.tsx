import { FormProvider } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Container from "@/components/container";
import { ServiceFormFields } from "@/components/service-form-fields";
import { Button } from "@/components/ui/button";

import { useOfficeIdStore } from "@/stores/use-officeId-store";
import { useFormDialogStore } from "@/stores/use-form-dialog-store";

import { useServiceForm } from "@/hooks/use-service-form";

export function FormDialog() {
  // Get current office ID
  const { currentOfficeId } = useOfficeIdStore();

  // Import form dialog
  const { id, isOpen, closeDialog } = useFormDialogStore();

  // State to track edit mode
  const isEditMode = Boolean(id);

  // Custom hook for form logic
  const {
    form,
    categoriesData,
    isCategoriesLoading,
    serviceNamesData,
    isServiceNamesLoading,
    handleCategoryChange,
    handleToggleDay,
    selectedDays,
    openingDaysFields,
    onSubmit,
    onDelete,
  } = useServiceForm({
    officeId: currentOfficeId,
    serviceId: id,
    isOpen,
    isEditMode,
    closeDialog,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{isEditMode ? "แก้ไขประเภทงาน" : "เพิ่มประเภทงาน"}</DialogTitle>
          <DialogDescription />

          {/* Content */}
          <Container className="px-5">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ServiceFormFields
                  categoriesData={categoriesData}
                  isCategoriesLoading={isCategoriesLoading}
                  serviceNamesData={serviceNamesData}
                  isServiceNamesLoading={isServiceNamesLoading}
                  handleCategoryChange={handleCategoryChange}
                  handleToggleDay={handleToggleDay}
                  selectedDays={selectedDays}
                  openingDaysFields={openingDaysFields.map((field) => ({
                    ...field,
                    timeSlots: field.timeSlots.map((slot) => ({
                      start: slot.startAt,
                      end: slot.endAt,
                    })),
                  }))}
                  form={form}
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
