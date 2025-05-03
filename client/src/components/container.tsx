import { Card } from "@/components/ui/card";

import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <Card className="relative mt-5 md:mt-24 mx-5 mb-5 h-[800px] ">{children}</Card>;
};

export default Container;
