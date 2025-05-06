import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { translateCategory, translateServiceName } from "@/lib/translate";
import { useGetAllServiceByOfficeId } from "@/hooks/use-api";
import { useFormDialogStore } from "@/stores/use-form-dialog-store";
import { useOfficeIdStore } from "@/stores/use-officeId-store";

interface Service {
  id: string;
  category: string;
  name: string;
}

export function ServicesTable() {
  // // Get current office ID
  const { currentOfficeId } = useOfficeIdStore();

  // // Fetch services by office ID
  const { data } = useGetAllServiceByOfficeId(currentOfficeId);

  // Import open dialog function
  const { openDialog } = useFormDialogStore();

  // Create services state
  const [services, setServices] = useState<Service[]>([]);

  // Set services
  useEffect(() => {
    if (currentOfficeId && data) {
      const transformed = data.length
        ? data.map((e: Service) => ({
            id: e.id,
            category: translateCategory(e.category),
            name: translateServiceName(e.name),
          }))
        : data;
      setServices(transformed);
    }
  }, [currentOfficeId, data]);

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
        {services.map((service, i) => (
          <TableRow key={`service-${i}`}>
            <TableCell onClick={() => openDialog(service.id)}>{service.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
