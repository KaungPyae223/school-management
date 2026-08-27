import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useRestoreCourse } from "../../hooks/useRestoreCourse";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const CoursesRestoreAlert = ({
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
  const { mutateAsync, isPending } = useRestoreCourse();
  const navigate = useNavigate();

  const handleRestore = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("courses.alerts.restoreSuccess"));
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
      onConfirm={handleRestore}
      variant="default"
      title={t("courses.alerts.restoreTitle")}
      description={t("courses.alerts.restoreDesc")}
      confirmButtonText={t("courses.alerts.restoreButton")}
      isPending={isPending}
    />
  );
};

export default CoursesRestoreAlert;
