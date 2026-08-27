import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useDeleteCourse } from "../../hooks/useDeleteCourse";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const CoursesDeleteAlert = ({
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
  const { mutateAsync, isPending } = useDeleteCourse();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("courses.alerts.deleteSuccess"));
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
      title={t("courses.alerts.deleteTitle")}
      description={t("courses.alerts.deleteDesc")}
      confirmButtonText={t("courses.alerts.deleteButton")}
      isPending={isPending}
    />
  );
};

export default CoursesDeleteAlert;
