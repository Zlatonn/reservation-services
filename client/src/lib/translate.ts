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

export const translateCategory = (category: string) => {
  const found = categories.find((item) => item.value === category);
  return found ? found.label : category;
};

export const translateServiceName = (serviceName: string) => {
  const found = serviceNames.find((item) => item.value === serviceName);
  return found ? found.label : serviceName;
};

export const translateWeekday = (weekday: number) => {
  const found = weekdays.find((item) => item.value === weekday);
  return found ? found.label : weekday;
};
