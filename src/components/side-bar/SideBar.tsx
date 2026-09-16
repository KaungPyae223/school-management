import { Sidebar } from "../ui/sidebar";
import SideBarContent from "./SideBarContent";
import SideBarFooter from "./SideBarFooter";
import SideBarHeader from "./SideBarHeader";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SideBarHeader />
      <SideBarContent />
      <SideBarFooter />
    </Sidebar>
  );
}
