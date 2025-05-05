import { useNavigation } from "react-day-picker";

import { format } from "date-fns";
import { th } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom calendar caption
const CalendarCaption = ({ displayMonth }: { displayMonth: Date }) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const yearBE = displayMonth.getFullYear() + 543;
  const monthName = format(displayMonth, "LLLL", { locale: th });

  return (
    <div className="flex items-center justify-between px-2 py-2">
      {/* Prev. month button */}
      <button onClick={() => previousMonth && goToMonth(previousMonth)} disabled={!previousMonth} className="p-1 disabled:opacity-30">
        <ChevronLeft className="h-5 w-5 border-[1px] rounded-md" />
      </button>

      {/* MM YYYY */}
      <span className="text-sm font-medium">{`${monthName} ${yearBE}`}</span>

      {/* Next month button */}
      <button onClick={() => nextMonth && goToMonth(nextMonth)} disabled={!nextMonth} className="p-1 disabled:opacity-30">
        <ChevronRight className="h-5 w-5 border-[1px] rounded-md" />
      </button>
    </div>
  );
};

export default CalendarCaption;
