import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { OfficeSelector } from "@/components/office-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServicesTable } from "@/components/services-table";
import { PaginationSelector } from "@/components/pagination-seclector";

import { Plus, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { useFormDialogStore } from "@/stores/use-form-dialog-store";
import { useOfficeIdStore } from "@/stores/use-officeId-store";
import { usePaginationStore } from "@/stores/use-pagination-store";

const Content = () => {
  // Get current office ID
  const { currentOfficeId } = useOfficeIdStore();

  // Import open dialog function
  const { openDialog } = useFormDialogStore();

  // Import from usePaginationStore
  const { skip, take, totalCount, setSkip } = usePaginationStore();

  const currentPage = Math.floor(skip / take) + 1;
  const totalPage = Math.ceil(totalCount / take);

  // Handle to prev page
  const handlePrevPage = () => {
    if (currentPage > 1) setSkip(skip - take);
  };

  // Handle to next page
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setSkip(skip + take);
    }
  };

  // Handle to first page
  const handleFirstPage = () => {
    if (currentPage > 1) {
      setSkip(0);
    }
  };

  // Handle to last page
  const handleLastPage = () => {
    if (currentPage < totalPage) {
      setSkip((totalPage - 1) * take);
    }
  };

  return (
    <>
      {/* ---------- Header ---------- */}
      <CardHeader className="mt-5">
        {/* Title */}
        <CardTitle className="text-lg sm:text-2xl ">ประเภทงานที่สามารถจองผ่านเว็ปไซต์</CardTitle>

        <div className="flex flex-col gap-10 xl:flex-row xl:gap-0 xl:justify-between mt-3">
          {/* Office selector & Add service button */}
          <div className="flex flex-col gap-1">
            <OfficeSelector />
            <Button
              disabled={currentOfficeId === ""}
              variant="outline"
              onClick={() => openDialog()}
              className="w-fit border-[1px] border-primary text-primary cursor-pointer hover:bg-primary hover:border-secondary hover:text-secondary"
            >
              <Plus />
              <span>เพิ่มประเภทงาน</span>
            </Button>
          </div>

          {/* Search box */}
          <div className="relative w-full xl:w-[450px]">
            <Input placeholder="ค้นหา" className="pl-10" />
            <Search className="absolute top-1.5 left-1.5 text-gray-500 w-5" />
          </div>
        </div>
      </CardHeader>

      {/* ---------- Content ---------- */}
      <CardContent>
        {/* Table data */}
        <ServicesTable />

        <div className="mt-3 flex justify-between items-center text-sm">
          {/* Pagination component */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:block">Rows per page</span>
            <PaginationSelector />
          </div>

          {/* Handle page component */}
          <div className="flex justify-between items-center gap-10 ">
            <span className="hidden lg:block">
              Page {currentPage} of {totalPage}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={handleFirstPage} className="cursor-pointer">
                <ChevronsLeft />
              </Button>
              <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={handlePrevPage} className="cursor-pointer">
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPage}
                onClick={handleNextPage}
                className="cursor-pointer"
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPage}
                onClick={handleLastPage}
                className="cursor-pointer"
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default Content;
