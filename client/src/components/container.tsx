import { Card } from "@/components/ui/card";

import { ReactNode } from "react";

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <Card className={`${className}`}>{children}</Card>;
};

export default Container;
