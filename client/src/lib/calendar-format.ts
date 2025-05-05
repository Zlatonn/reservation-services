import { format } from "date-fns";
import { th } from "date-fns/locale";

export const formatThaiDate = (date: Date) => {
  const formatted = format(date, "d MMM yyyy", { locale: th });
  const [day, month, year] = formatted.split(" ");
  const buddhistYear = (parseInt(year, 10) + 543).toString();
  return `${day} ${month} ${buddhistYear}`;
};
