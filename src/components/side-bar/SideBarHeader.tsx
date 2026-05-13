import { GraduationCap } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../ui/sidebar";

const Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu className="border-b border-b-gray-300 pb-1.5">
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="#">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GraduationCap className="size-5" />
              </div>
              <div className="flex gap-0.5 ms-1.5 leading-none">
                <span className="font-semibold">School Management</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default Header;
