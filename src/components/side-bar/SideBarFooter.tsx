import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { CircleQuestionMark, Code2, Settings } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <SidebarFooter>
      <SidebarMenu>
        {/* Settings */}
        <SidebarMenuItem className="space-y-1.5">
          <SidebarMenuButton asChild tooltip={t("general.help")}>
            <a href="#">
              <CircleQuestionMark />
              <span>{t("general.help")}</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton asChild tooltip={t("settings.title")}>
            <NavLink to="/settings">
              <Settings />
              <span>{t("settings.title")}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Developer Credit */}
        <SidebarMenuItem className="border-t border-t-gray-300 mt-3 pt-3">
          <SidebarMenuButton
            asChild
            tooltip={`${t("general.developedBy")} Kaung Pyae Aung`}
            className="text-muted-foreground hover:text-sidebar-foreground"
          >
            <a href="#">
              <Code2 className="shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px]">{t("general.developedBy")}</span>
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
