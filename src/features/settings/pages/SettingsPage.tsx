import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import SettingsChangeAppearance from "../components/SettingsChangeAppearance";
import SettingsChangeLanguage from "../components/SettingsChangeLanguage";
import SettingsChangeTheme from "../components/SettingsChangeTheme";

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
      <CardContent className="divide-y py-3">
        <SettingsChangeAppearance />
        <SettingsChangeTheme />
        <SettingsChangeLanguage />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
