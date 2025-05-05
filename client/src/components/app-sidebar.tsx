import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { menuItems } from "@/contents/sidebar-content";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader
        style={{
          backgroundImage: `linear-gradient(120deg, 
      var(--sidebar-primary) 0%, 
      var(--sidebar-primary) 25%,  
      var(--sidebar-primary-shade) 55%,
      var(--sidebar-primary-shade) 60%, 
      var(--sidebar-primary) 100%)`,
        }}
      >
        <div className="flex justify-center items-center px-5 gap-3">
          <img src="/public/images/logo.svg" alt="Logo" className="w-12 h-12" />
          <p className="text-lg font-medium text-accent">ระบบจัดการจอง</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5 text-muted-foreground">
        <SidebarMenu className="gap-3">
          {menuItems.map((item, i) => (
            <SidebarMenuItem key={`item-${i}`}>
              <SidebarMenuButton asChild className="py-5 shadow-xs">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          asChild
          className="flex justify-center items-center border-[1px] bg-primary text-accent hover:bg-white hover:text-primary hover:border-primary cursor-pointer"
        >
          <a href="#">
            <LogOut />
            <span>ออกจากระบบ</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
