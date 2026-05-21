import type React from "react";
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

const ConfirmDialog = ({
  confirmDialogOpen,
  setConfirmDialogOpen,
  onConfirm,
  title,
  description,
  variant = "default",
}: {
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: "default" | "destructive";
}) => {
  return (
    <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" size="default">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            variant={variant}
            size="default"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
