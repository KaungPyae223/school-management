import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteEnrollment } from "../../classes/hooks/useDeleteEnrollment";

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
  const { mutateAsync, isPending } = useDeleteEnrollment(id);

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("students.alerts.deleteEnrollmentSuccess"));
    } catch (error: any) {
      toast.error(error.message);
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
      title={t("students.alerts.deleteEnrollmentTitle")}
      description={t("students.alerts.deleteEnrollmentDesc")}
      isPending={isPending}
    />
  );
};

export default StudentsEnrolledClassesDeleteAlert;
