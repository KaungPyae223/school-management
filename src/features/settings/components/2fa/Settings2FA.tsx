import { useLoaderData, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/button";

const Settings2FA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { is2FAEnabled } = useLoaderData();

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.twoFactor.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.twoFactor.description")}
        </p>
      </div>

      <div>
        <Button
          onClick={() => navigate("/settings/manage-2fa")}
          variant="outline"
        >
          {is2FAEnabled
            ? t("settings.twoFactor.disable2FA")
            : t("settings.twoFactor.enable2FA")}
        </Button>
      </div>
    </div>
  );
};

export default Settings2FA;
