import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useCompleteClass } from "../../hooks/api/useCompleteClass";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const ClassesCompleteAlert = ({
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
  const { mutateAsync, isPending } = useCompleteClass();
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("classes.alerts.completeSuccess"));
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
      onConfirm={handleComplete}
      variant="default"
      title={t("classes.alerts.completeTitle")}
      description={t("classes.alerts.completeDesc")}
      confirmButtonText={t("classes.alerts.completeButton")}
      isPending={isPending}
    />
  );
};

export default ClassesCompleteAlert;

