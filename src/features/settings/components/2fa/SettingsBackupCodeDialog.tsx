import type React from "react";
import { useTranslation } from "react-i18next";

import { Check, Copy } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { useBackupCodes } from "../../hooks/2fa/useBackupCodes";

interface BackupCodesDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backupCodes: string[];
}

const SettingsBackupCodeDialog = ({
  open,
  setOpen,
  backupCodes = [],
}: BackupCodesDialogProps) => {
  const { t } = useTranslation();
  const { copied, handleCopy, handleBack } = useBackupCodes(backupCodes);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("settings.twoFactor.backupCodesTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("settings.twoFactor.backupCodesDesc")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="relative my-2 rounded-lg border border-border bg-muted p-4">
          <div className="grid grid-cols-2 gap-2 text-center font-mono text-sm tracking-wider sm:text-base">
            {backupCodes.map((code, index) => (
              <div
                key={index}
                className="rounded bg-background px-3 py-1.5 font-semibold text-foreground border border-border"
              >
                {code}
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  <span>{t("general.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t("general.copyAll")}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleBack}
            variant={"default"}
            size="default"
          >
            {t("general.back")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsBackupCodeDialog;
