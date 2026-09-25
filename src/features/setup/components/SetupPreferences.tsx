import { Card, CardContent } from "../../../components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import SettingsChangeAppearance from "../../settings/components/preferences/SettingsChangeAppearance";
import SettingsChangeDefaultView from "../../settings/components/preferences/SettingsChangeDefaultView";
import SettingsChangeLanguage from "../../settings/components/preferences/SettingsChangeLanguage";
import SettingsChangeTheme from "../../settings/components/preferences/SettingsChangeTheme";

const SetupPreferences = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <SlidersHorizontal className="size-5" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          {t("setup.preferences.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("setup.preferences.description")}
        </p>
      </div>

      <Card className="w-full  mx-auto shadow-xs pb-1.5 pt-5 px-1.5">
        <CardContent className="divide-y ">
          <SettingsChangeAppearance />
          <SettingsChangeDefaultView />
          <SettingsChangeTheme />
          <SettingsChangeLanguage />
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupPreferences;
