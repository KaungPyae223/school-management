import type React from "react";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";

const ConfirmDialog = ({
  confirmDialogOpen,
  setConfirmDialogOpen,
  onConfirm,
  title,
  description,
  variant = "default",
  isPending = false,
  confirmButtonText = "",
  children,
}: {
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: "default" | "destructive";
  isPending?: boolean;
  confirmButtonText?: string;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" size="default">
            {t("general.cancel")}
          </AlertDialogCancel>
          {children}
          <AlertDialogAction
            onClick={onConfirm}
            variant={variant}
            size="default"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : confirmButtonText ? (
              confirmButtonText
            ) : (
              t("general.continue")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
