import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

const officeNameOptions = [
  { label: "สำนักงานขนส่งพื้นที่1(บางขุนเทียน)", value: "สำนักงานขนส่งพื้นที่1(บางขุนเทียน)" },
  { label: "สำนักงานขนส่งพื้นที่2(ตลิ่งชัน)", value: "สำนักงานขนส่งพื้นที่2(ตลิ่งชัน)" },
  { label: "สำนักงานขนส่งพื้นที่3(พระขโนง)", value: "สำนักงานขนส่งพื้นที่3(พระขโนง)" },
  { label: "สำนักงานขนส่งพื้นที่4(หนองจอก)", value: "สำนักงานขนส่งพื้นที่4(หนองจอก)" },
  { label: "สำนักงานขนส่งพื้นที่5(จตุจักร)", value: "สำนักงานขนส่งพื้นที่5(จตุจักร)" },
  { label: "สำนักงานขนส่งพื้นที่5(ส่วนทะเบียนรถคนส่ง)", value: "สำนักงานขนส่งพื้นที่5(ส่วนทะเบียนรถคนส่ง)" },
  { label: "โรงเรียนสอนขับรถสำนักงานขนส่งพื้นที่5อาคาร8", value: "โรงเรียนสอนขับรถสำนักงานขนส่งพื้นที่5อาคาร8" },
  { label: "กรมการขนส่งทางบก(อาคาร8)", value: "กรมการขนส่งทางบก(อาคาร8)" },
  { label: "สมุทรปราการสาขาพระประแดง", value: "สมุทรปราการสาขาพระประแดง" },
];

export function OfficeSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full xl:w-[450px] justify-between">
          {value ? officeNameOptions.find((office) => office.value === value)?.label : "เลือกสาขา..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="เลือกสาขา..." />
          <CommandList>
            <CommandEmpty>ไม่พบสาขาที่เลือก</CommandEmpty>
            <CommandGroup>
              {officeNameOptions.map((office) => (
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
