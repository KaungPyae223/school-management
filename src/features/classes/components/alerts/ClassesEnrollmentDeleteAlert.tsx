import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { useDeleteEnrollment } from "../../hooks/useDeleteEnrollment";
import { translateError } from "../../../../utils/translate-error";

const ClassesEnrollmentDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
  back,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  back?: boolean;
}) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeleteEnrollment(id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("classes.alerts.deleteEnrollmentSuccess"));
      if (back) {
        navigate(-1);
      }
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
      title={t("classes.alerts.deleteEnrollmentTitle")}
      description={t("classes.alerts.deleteEnrollmentDesc")}
      confirmButtonText={t("classes.alerts.deleteEnrollmentButton")}
      isPending={isPending}
    />
  );
};

export default ClassesEnrollmentDeleteAlert;
