import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";
import { useRestoreTeacher } from "../../hooks/api/useRestoreTeacher";

const TeachersRestoreAlert = ({
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
  const { mutateAsync, isPending } = useRestoreTeacher();

  const navigate = useNavigate();

  const handleRestore = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("teachers.alerts.restoreSuccess"));
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
      confirmButtonText={t("teachers.alerts.restoreButton")}
      title={t("teachers.alerts.restoreTitle")}
      description={t("teachers.alerts.restoreDesc")}
      isPending={isPending}
    />
  );
};

export default TeachersRestoreAlert;
