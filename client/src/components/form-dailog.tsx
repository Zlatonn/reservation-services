import { useEffect } from "react";

import { useFormDialog } from "@/hooks/use-form-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { th } from "date-fns/locale";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Container from "@/components/container";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CalendarCaption from "@/components/calendar-caption";

import { CalendarIcon } from "lucide-react";

import { formatThaiDate } from "@/lib/calendar-format";
import { useCreateService, useDeleteService, useGetService, useUpdateService } from "@/hooks/use-api";
import { useOfficeId } from "@/hooks/use-officeId";

// Mock up categories
const categories = [
  { value: "REGISTRATION", label: "งานทะเบียน" },
  { value: "LICENSE", label: "งานใบอนุญาต" },
  { value: "FOREIGN_LICENSE", label: "ใบอนุญาตขับขี่ชาวต่างชาติ" },
  { value: "PERSONAL_LICENSE", label: "ใบอนุญาตขับขี่ส่วนบุคคล" },
  { value: "PUBLIC_LICENSE", label: "ใบอนุญาตขับรถสาธารณะ" },
  { value: "TRANSPORT_LAW_LICENSE", label: "สอบกฎหมายขนส่ง" },
  { value: "POINT_TRAINING", label: "อบรมตัดแต้ม" },
  { value: "OTHER_SERVICES", label: "บริการอื่น ๆ" },
];

// Mock up services
const serviceNames = [
  { value: "TAX_PAYMENT", label: "ชำระภาษี" },
  { value: "VEHICLE_MOVE_OUT", label: "แจ้งย้ายรถออก" },
  { value: "VEHICLE_UNUSED", label: "แจ้งไม่ใช้รถ" },
  { value: "DUP_REGISTRATION_BOOK", label: "ขอเล่มทะเบียนใหม่" },
  { value: "DUP_TAX_STICKER", label: "ขอป้ายภาษีใหม่" },
  { value: "DUP_LICENSE_PLATE", label: "ขอป้ายทะเบียนใหม่" },
  { value: "LEASING_TRANSFER", label: "โอนรถเช่าซื้อ" },
  { value: "TAXI_RETIRE", label: "แจ้งเลิกใช้แท็กซี่" },
  { value: "VEHICLE_MODIFICATION", label: "แจ้งเปลี่ยนแปลงรถ" },
  { value: "VEHICLE_MOVE_IN", label: "แจ้งย้ายรถเข้า" },
  { value: "OWNER_INFO_UPDATE", label: "เปลี่ยนข้อมูลเจ้าของรถ" },
];

// Mock up weekdays
const weekdays = [
  { value: 0, label: "อาทิตย์" },
  { value: 1, label: "จันทร์" },
  { value: 2, label: "อังคาร" },
  { value: 3, label: "พุธ" },
  { value: 4, label: "พฤหัสบดี" },
  { value: 5, label: "ศุกร์" },
  { value: 6, label: "เสาร์" },
];

// Create schemas

// Opening schema
const openingDaySchema = z.object({
  id: z.string().optional(),
  day: z.number().int().min(0, "Day must be between 0 and 6").max(6, "Day must be between 0 and 6"),
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

export function FormDialog() {
  // get current office ID
  const { currentOfficeId } = useOfficeId();

  // Import form dialog
  const { id, isOpen, closeDialog } = useFormDialog();

  // Fetch service data
  const { data } = useGetService(id);

  const { mutate: createService } = useCreateService();
  const { mutate: updateService } = useUpdateService(id);
  const { mutate: deleteService } = useDeleteService(id);

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

  // Set form data
  useEffect(() => {
    if (isOpen && id && data) {
      form.reset({
        category: data.category || "",
        name: data.name || "",
        reservableDate: data.reservableDate || "",
        openingDays: data.openingDays || [],
        description: data.description || "",
        officeId: data.officeId || currentOfficeId,
      });
    } else {
      form.reset({
        category: "",
        name: "",
        reservableDate: "",
        openingDays: [],
        description: "",
        officeId: currentOfficeId,
      });
    }
  }, [isOpen, id, form, data, currentOfficeId]);

  // Handle submit form
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    if (id) {
      updateService({
        ...value,
        reservableDate: new Date(value.reservableDate),
        openingDays: value.openingDays.map((d) => ({
          day: d.day,
        })),
      });
    } else {
      createService({
        ...value,
        reservableDate: new Date(value.reservableDate),
      });
    }

    closeDialog();
  };

  // Handle delete
  const onDelete = () => {
    deleteService();
    closeDialog();
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Cetegory field*/}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row">
                      <FormLabel className="text-nowrap w-40">กลุ่มงาน</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--กรุณาเลือกประเภทกลุ่มงาน--" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category, i) => (
                            <SelectItem key={`category-${i}`} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl className="flex-grow">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--กรุณาเลือกประเภทชื่อประเภทงาน--" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceNames.map((name, i) => (
                            <SelectItem key={`service-${i}`} value={name.value}>
                              {name.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                                const isoString = selectedDate.toISOString();
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
                <FormField
                  control={form.control}
                  name="openingDays"
                  render={() => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start">
                      <FormLabel className="text-nowrap w-40">วันที่เปิดทำงาน</FormLabel>
                      <div className="w-full flex flex-col gap-2">
                        {weekdays.map((wd, i) => (
                          <FormField
                            key={`wd-${i}`}
                            control={form.control}
                            name="openingDays"
                            render={({ field }) => (
                              <FormItem className="flex">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.some((day) => day.day === wd.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, { day: wd.value }])
                                        : field.onChange(field.value?.filter((day) => day.day !== wd.value));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{wd.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

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
            </Form>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
