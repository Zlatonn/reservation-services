import { useState } from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

// Mock up offices
const offices = [
  { value: "สำนักงานขนส่งพื้นที่1(บางขุนเทียน)", label: "สำนักงานขนส่งพื้นที่1(บางขุนเทียน)" },
  { value: "สำนักงานขนส่งพื้นที่2(ตลิ่งชัน)", label: "สำนักงานขนส่งพื้นที่2(ตลิ่งชัน)" },
  { value: "สำนักงานขนส่งพื้นที่3(พระขโนง)", label: "สำนักงานขนส่งพื้นที่3(พระขโนง)" },
  { value: "สำนักงานขนส่งพื้นที่4(หนองจอก)", label: "สำนักงานขนส่งพื้นที่4(หนองจอก)" },
  { value: "สำนักงานขนส่งพื้นที่5(จตุจักร)", label: "สำนักงานขนส่งพื้นที่5(จตุจักร)" },
  { value: "สำนักงานขนส่งพื้นที่5(ส่วนทะเบียนรถคนส่ง)", label: "สำนักงานขนส่งพื้นที่5(ส่วนทะเบียนรถคนส่ง)" },
  { value: "โรงเรียนสอนขับรถสำนักงานขนส่งพื้นที่5อาคาร8", label: "โรงเรียนสอนขับรถสำนักงานขนส่งพื้นที่5อาคาร8" },
  { value: "กรมการขนส่งทางบก(อาคาร8)", label: "กรมการขนส่งทางบก(อาคาร8)" },
  { value: "สมุทรปราการสาขาพระประแดง", label: "สมุทรปราการสาขาพระประแดง" },
];

export function OfficeSelector() {
  // Create state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full xl:w-[450px] justify-between">
          {value ? offices.find((office) => office.value === value)?.label : "เลือกสาขา..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="เลือกสาขา..." />
          <CommandList>
            <CommandEmpty>ไม่พบสาขาที่เลือก</CommandEmpty>
            <CommandGroup>
              {offices.map((office) => (
                <CommandItem
                  key={office.value}
                  value={office.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === office.value ? "opacity-100" : "opacity-0")} />
                  {office.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
