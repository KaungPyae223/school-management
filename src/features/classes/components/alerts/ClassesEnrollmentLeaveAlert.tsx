import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useToggleLeaveEnrollment } from "../../hooks/api/useToggleLeaveEnrollment";
import { translateError } from "../../../../utils/translate-error";

const ClassesEnrollmentLeaveAlert = ({
  id,
  isLeave,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  isLeave: boolean;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useToggleLeaveEnrollment();

  const handleToggleLeave = async () => {
    try {
      await mutateAsync(id);
      toast.success(
        isLeave
          ? t("classes.alerts.rejoinEnrollmentSuccess")
          : t("classes.alerts.leaveEnrollmentSuccess"),
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
      onConfirm={handleToggleLeave}
      variant={isLeave ? "default" : "destructive"}
      title={
        isLeave
          ? t("classes.alerts.rejoinEnrollmentTitle")
          : t("classes.alerts.leaveEnrollmentTitle")
      }
      description={
        isLeave
          ? t("classes.alerts.rejoinEnrollmentDesc")
          : t("classes.alerts.leaveEnrollmentDesc")
      }
      confirmButtonText={
        isLeave
          ? t("classes.alerts.rejoinEnrollmentButton")
          : t("classes.alerts.leaveEnrollmentButton")
      }
      isPending={isPending}
    />
  );
};

export default ClassesEnrollmentLeaveAlert;
