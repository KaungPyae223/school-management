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
import SettingsChangeDefaultView from "../components/preferences/SettingsChangeDefaultView";
import SettingsTour from "../tour/SettingsTour";
import SettingsReset from "../components/reset/SettingsReset";

const SettingsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.title"),
  });

  return (
    <>
      <SettingsTour />

      <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg text-end">
            {t("settings.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y ">
          <SettingsChangeAppearance />
          <SettingsChangeDefaultView />
          <SettingsChangeTheme />
          <SettingsChangeLanguage />
          <SettingsManagePassword />
          <Settings2FA />
          <SettingsDataBackup />
          <SettingsReset />
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsPage;
