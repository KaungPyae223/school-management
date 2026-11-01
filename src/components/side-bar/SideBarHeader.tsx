import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { School } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../ui/sidebar";

const Header = () => {
  const { t } = useTranslation();

  return (
    <SidebarHeader>
      <SidebarMenu className="border-b border-b-gray-300 pb-1.5">
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white">
                <School className="size-5" />
              </div>
              <div className="flex gap-0.5 ms-1.5 leading-none">
                <span className="font-semibold">{t("general.appTitle")}</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default Header;
