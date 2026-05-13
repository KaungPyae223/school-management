import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { CircleQuestionMark, Code2, Settings } from "lucide-react";

const Footer = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        {/* Settings */}
        <SidebarMenuItem className="space-y-1.5">
          <SidebarMenuButton asChild tooltip="Help">
            <a href="#">
              <CircleQuestionMark />
              <span>Help</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton asChild tooltip="Settings">
            <a href="#">
              <Settings />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Developer Credit */}
        <SidebarMenuItem className="border-t border-t-gray-300 mt-3 pt-3">
          <SidebarMenuButton
            asChild
            tooltip="Developed by Kaung Pyae Aung"
            className="text-muted-foreground hover:text-sidebar-foreground"
          >
            <a href="#">
              <Code2 className="shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px]">Developed by</span>
                <span className="text-xs font-medium">Kaung Pyae Aung</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default Footer;
