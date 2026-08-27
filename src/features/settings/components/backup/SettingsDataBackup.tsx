import { useTranslation } from "react-i18next";

import { Button } from "../../../components/ui/button";

import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { AlertDialogAction } from "../../../components/ui/alert-dialog";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const SettingsDataBackup = () => {
  const { t } = useTranslation();
  const [confirm2FASetupDialogOpen, setConfirm2FASetupDialogOpen] =
    useState(false);
  const [confirmPasswordSetupDialogOpen, setConfirmPasswordSetupDialogOpen] =
    useState(false);
  const navigate = useNavigate();

  const { is2FAEnabled, hasPassword } = useLoaderData();

  const backup = () => {
    if (is2FAEnabled && hasPassword) {
      navigate("/settings/backup");
    } else if (!hasPassword) {
      setConfirmPasswordSetupDialogOpen(true);
    } else {
      setConfirm2FASetupDialogOpen(true);
    }
  };

  return (
    <div className="flex items-center gap-5 justify-between pt-3.5 pb-1.5">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {t("settings.backup.title")}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("settings.backup.description")}
        </p>
      </div>
      <Button variant={"outline"} onClick={backup}>
        {t("settings.backup.button")}
      </Button>
      <ConfirmDialog
        confirmDialogOpen={confirmPasswordSetupDialogOpen}
        setConfirmDialogOpen={setConfirmPasswordSetupDialogOpen}
        onConfirm={() => navigate("/settings/manage-password")}
        title={t("settings.backup.noPasswordTitle")}
        description={t("settings.backup.noPasswordDesc")}
        confirmButtonText={t("settings.backup.setPassword")}
      />
      <ConfirmDialog
        confirmDialogOpen={confirm2FASetupDialogOpen}
        setConfirmDialogOpen={setConfirm2FASetupDialogOpen}
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

export default SettingsDataBackup;
