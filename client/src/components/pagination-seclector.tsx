import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { usePaginationStore } from "@/stores/use-pagination-store";

// Mock up pagination numbers
const paginationNums = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];
export function PaginationSelector() {
  // Import set take from usePaginationStore
  const { setTake } = usePaginationStore();
  return (
    <Select onValueChange={(value) => setTake(Number(value))}>
      <SelectTrigger className="w-18">
        <SelectValue placeholder={10} />
      </SelectTrigger>
      <SelectContent>
        {paginationNums.map((pn, i) => (
          <SelectItem key={`pn-${i}`} value={pn.value}>
            {pn.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
