import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { translateError } from "../../../../utils/translate-error";
import { useDeleteEnrollment } from "../../../classes/hooks/api/useDeleteEnrollment";

const StudentsEnrolledClassesDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeleteEnrollment();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("students.alerts.deleteEnrollmentSuccess"));
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
      onConfirm={handleDelete}
      variant="destructive"
      confirmButtonText={t("students.alerts.deleteEnrollmentButton")}
      title={t("students.alerts.deleteEnrollmentTitle")}
      description={t("students.alerts.deleteEnrollmentDesc")}
      isPending={isPending}
    />
  );
};

export default StudentsEnrolledClassesDeleteAlert;
