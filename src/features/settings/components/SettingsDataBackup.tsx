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
          Data Backup & Restore
        </p>
        <p className="text-xs text-muted-foreground">
          Export a backup file or restore your database and media files.
        </p>
      </div>
      <Button variant={"outline"} onClick={backup}>
        Backup
      </Button>
      <ConfirmDialog
        confirmDialogOpen={confirmPasswordSetupDialogOpen}
        setConfirmDialogOpen={setConfirmPasswordSetupDialogOpen}
        onConfirm={() => navigate("/settings/manage-password")}
        title={"Password Not Set"}
        description={
          "Please set a password before backing up. You cannot backup without a password."
        }
        confirmButtonText={"Set Password"}
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
