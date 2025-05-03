import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ServicesTable } from "@/components/services-table";
import { SelectScrollable } from "@/components/select-demo";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Content = () => {
  return (
    <CardContent>
      <ServicesTable />

      <div className="mt-3 flex justify-between items-center text-sm">
        <div className="flex items-center gap-3">
          <span className="hidden lg:block">Rows per page</span>
          <SelectScrollable />
        </div>

        <div className="flex justify-between items-center gap-10 ">
          <span className="hidden lg:block">Page 1 of 4</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ChevronsLeft />
            </Button>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ChevronRight />
            </Button>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default Content;
