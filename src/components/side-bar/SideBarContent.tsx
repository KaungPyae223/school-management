import { NavLink } from "react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  CalendarDays,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  UserRoundPen,
  Users,
} from "lucide-react";

const Content = () => {
  const items = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Timetable", url: "/timetable", icon: CalendarDays },
    { title: "Courses", url: "/courses", icon: LibraryBig },
    { title: "Classes", url: "/classes", icon: Users },
    { title: "Students", url: "/students", icon: GraduationCap },
    { title: "Teachers", url: "/teachers", icon: UserRoundPen },
    { title: "Payments", url: "/payments", icon: CreditCard },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1.5">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
