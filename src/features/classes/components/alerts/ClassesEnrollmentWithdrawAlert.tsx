import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useToggleWithdrawEnrollment } from "../../hooks/api/useToggleWithdrawEnrollment";
import { translateError } from "../../../../utils/translate-error";

const ClassesEnrollmentWithdrawAlert = ({
  id,
  isWithdraw,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  isWithdraw: boolean;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useToggleWithdrawEnrollment();

  const handleToggleWithdraw = async () => {
    try {
      await mutateAsync(id);
      toast.success(
        isWithdraw
          ? t("classes.alerts.rejoinEnrollmentSuccess")
          : t("classes.alerts.withdrawEnrollmentSuccess"),
      );
    } catch (error: any) {
      toast.error(translateError(error, t));
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <ConfirmDialog
      confirmDialogOpen={confirmDialogOpen}
      setConfirmDialogOpen={setConfirmDialogOpen}
      onConfirm={handleToggleWithdraw}
      variant={isWithdraw ? "default" : "destructive"}
      title={
        isWithdraw
          ? t("classes.alerts.rejoinEnrollmentTitle")
          : t("classes.alerts.withdrawEnrollmentTitle")
      }
      description={
        isWithdraw
          ? t("classes.alerts.rejoinEnrollmentDesc")
          : t("classes.alerts.withdrawEnrollmentDesc")
      }
      confirmButtonText={
        isWithdraw
          ? t("classes.alerts.rejoinEnrollmentButton")
          : t("classes.alerts.withdrawEnrollmentButton")
      }
      isPending={isPending}
    />
  );
};

export default ClassesEnrollmentWithdrawAlert;
