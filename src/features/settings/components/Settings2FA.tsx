import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";
import { authService } from "../../../services/auth";
import { useAppQuery } from "../../../hooks/use-app-query";

const Settings2FA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data } = useAppQuery({
    queryKey: ["is2FAEnable"],
    queryFn: () => authService.is2FAEnabled(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });

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
          {data
            ? t("settings.twoFactor.disable2FA")
            : t("settings.twoFactor.enable2FA")}
        </Button>
      </div>
    </div>
  );
};

export default Settings2FA;

