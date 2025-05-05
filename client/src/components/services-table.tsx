import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock up service data
const services = [
  { name: "ชำระภาษีรถยนต์ประจำปี" },
  { name: "ขอป้ายทะเบียนใหม่" },
  { name: "แจ้งย้ายรถเข้า" },
  { name: "แจ้งย้ายรถออก" },
  { name: "ขอโอนกรรมสิทธิ์รถ" },
  { name: "ต่ออายุใบอนุญาตขับขี่" },
  { name: "ขอใบแทนใบอนุญาตขับขี่" },
  { name: "จองคิวอบรมตัดแต้ม" },
  { name: "ยื่นคำร้องเปลี่ยนข้อมูลเจ้าของรถ" },
  { name: "ขอใบแทนเล่มทะเบียน" },
];

export function ServicesTable() {
  return (
    <Table>
      {/* Header */}
      <TableHeader>
        <TableRow>
          <TableHead className="pl-5 text-lg text-gray-500 font-semibold">ประเภทงาน</TableHead>
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.name}>
            <TableCell>{service.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
