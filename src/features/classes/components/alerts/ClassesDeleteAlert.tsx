import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useDeleteClass } from "../../hooks/useDeleteClass";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const ClassesDeleteAlert = ({
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
  const { mutateAsync, isPending } = useDeleteClass();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("classes.alerts.deleteSuccess"));
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
      title={t("classes.alerts.deleteTitle")}
      description={t("classes.alerts.deleteDesc")}
      confirmButtonText={t("classes.alerts.deleteButton")}
      isPending={isPending}
    />
  );
};

export default ClassesDeleteAlert;

