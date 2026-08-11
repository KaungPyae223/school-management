import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";

const SettingsManagePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.managePassword.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.managePassword.description")}
        </p>
      </div>

      <div>
        <Button
          onClick={() => navigate("/settings/manage-password")}
          variant="outline"
        >
          {t("settings.managePassword.button")}
        </Button>
      </div>
    </div>
  );
};

export default SettingsManagePassword;

