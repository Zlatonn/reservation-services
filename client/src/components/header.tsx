import { CardHeader, CardTitle } from "@/components/ui/card";
import { OfficeSelector } from "@/components/office-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";

const Header = () => {
  return (
    <CardHeader className="mt-5">
      {/* Title */}
      <CardTitle className="text-lg sm:text-2xl ">ประเภทงานที่สามารถจองผ่านเว็ปไซต์</CardTitle>

      <div className="flex flex-col gap-10 xl:flex-row xl:gap-0 xl:justify-between mt-3">
        {/* Office selector & Add service button */}
        <div className="flex flex-col gap-1">
          <OfficeSelector />
          <Button
            variant="outline"
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
  );
};

export default Header;
