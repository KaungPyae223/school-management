import {
  Sidebar,
} from "../ui/sidebar";
import Content from "./SideBarContent";
import Footer from "./SideBarFooter";
import Header from "./SideBarHeader";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
}
