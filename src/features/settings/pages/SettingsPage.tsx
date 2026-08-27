import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import SettingsChangeAppearance from "../components/preferences/SettingsChangeAppearance";
import SettingsChangeLanguage from "../components/preferences/SettingsChangeLanguage";
import SettingsChangeTheme from "../components/preferences/SettingsChangeTheme";
import SettingsManagePassword from "../components/password/SettingsManagePassword";
import Settings2FA from "../components/2fa/Settings2FA";
import SettingsDataBackup from "../components/backup/SettingsDataBackup";

const SettingsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.title"),
  });

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg">{t("settings.title")}</CardTitle>
      </CardHeader>
      <CardContent className="divide-y ">
        <SettingsChangeAppearance />
        <SettingsChangeTheme />
        <SettingsChangeLanguage />
        <SettingsManagePassword />
        <Settings2FA />
        <SettingsDataBackup />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
