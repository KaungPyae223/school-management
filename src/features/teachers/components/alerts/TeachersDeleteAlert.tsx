import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useDeleteTeacher } from "../../hooks/api/useDeleteTeacher";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const TeachersDeleteAlert = ({
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
  const { mutateAsync, isPending } = useDeleteTeacher();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("teachers.alerts.deleteSuccess"));
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
      confirmButtonText={t("teachers.alerts.deleteButton")}
      title={t("teachers.alerts.deleteTitle")}
      description={t("teachers.alerts.deleteDesc")}
      isPending={isPending}
    />
  );
};

export default TeachersDeleteAlert;
