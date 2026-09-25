import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  UserRoundPen,
} from "lucide-react";

const Content = () => {
  const { t } = useTranslation();

  const items = [
    {
      title: "Dashboard",
      translationKey: "dashboard.title",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      translationKey: "students.title",
      url: "/students",
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      translationKey: "teachers.title",
      url: "/teachers",
      icon: UserRoundPen,
    },
    {
      title: "Courses",
      translationKey: "courses.title",
      url: "/courses",
      icon: LibraryBig,
    },
    {
      title: "Classes",
      translationKey: "classes.title",
      url: "/classes",
      icon: BookOpen,
    },
    {
      title: "Payments",
      translationKey: "payments.title",
      url: "/payments",
      icon: CreditCard,
    },
    {
      title: "Timetable",
      translationKey: "timetable.title",
      url: "/timetable",
      icon: CalendarDays,
    },
    {
      title: "Analysis",
      translationKey: "analysis.title",
      url: "/analysis",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1.5">
            {items.map((item) => {
              const label = t(item.translationKey, {
                defaultValue: item.title,
              });
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={label}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
