import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { useGetOffices } from "@/hooks/use-api";
import { useOfficeIdStore } from "@/stores/use-officeId-store";

interface Offices {
  id: string;
  name: string;
}

export function OfficeSelector() {
  // Fetch offices data using useGetOffices()
  const { data } = useGetOffices();

  // Import set officeId function
  const { setOfficeId } = useOfficeIdStore();

  // // create office state
  const [offices, setOffices] = useState<Offices[]>([]);

  // initial fetch
  useEffect(() => {
    setOffices(data);
  }, [data]);

  // Create input state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full xl:w-[450px] justify-between">
          {value ? offices.find((office) => office.id === value)?.name : "เลือกสาขา..."}
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
              {offices &&
                offices.map((office, i) => (
                  <CommandItem
                    key={`office-${i}`}
                    value={office.name}
                    onSelect={() => {
                      setValue(office.id);
                      setOfficeId(office.id);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === office.id ? "opacity-100" : "opacity-0")} />
                    {office.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
