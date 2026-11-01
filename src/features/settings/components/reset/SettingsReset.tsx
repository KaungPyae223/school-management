import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../../../../components/ui/button";

const SettingsReset = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-5 justify-between pt-3.5 pb-1.5"
      data-tour="reset"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {t("settings.reset.title")}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("settings.reset.description")}
        </p>
      </div>
      <Button
        variant={"destructive"}
        onClick={() => navigate("/settings/reset")}
      >
        {t("settings.reset.button")}
      </Button>
    </div>
  );
};

export default SettingsReset;
