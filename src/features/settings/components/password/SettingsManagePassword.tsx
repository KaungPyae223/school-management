import { useLoaderData, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useState } from "react";
import { AlertDialogAction } from "../../../components/ui/alert-dialog";

const SettingsManagePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { is2FAEnabled } = useLoaderData();

  const managePassword = () => {
    if (is2FAEnabled) {
      navigate("/settings/manage-password");
    } else {
      setConfirmDialogOpen(true);
    }
  };

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.managePassword.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.managePassword.description")}
        </p>
      </div>

      <div>
        <Button onClick={managePassword} variant="outline">
          {t("settings.managePassword.button")}
        </Button>
      </div>
      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={() => navigate("/settings/manage-2fa")}
        title={t("settings.twoFactor.notEnabledTitle")}
        description={t("settings.twoFactor.notEnabledDesc")}
        confirmButtonText={t("settings.twoFactor.enable2FA")}
      >
        <AlertDialogAction
          onClick={() => navigate("/settings/manage-password")}
          variant="destructive"
          size="default"
        >
          {t("settings.managePassword.button")}
        </AlertDialogAction>
      </ConfirmDialog>
    </div>
  );
};

export default SettingsManagePassword;
