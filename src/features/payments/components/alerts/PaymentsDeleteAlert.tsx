import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { useDeletePayment } from "../../hooks/api/useDeletePayment";
import { translateError } from "../../../../utils/translate-error";

const PaymentsDeleteAlert = ({
  id,
  classId,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  classId: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeletePayment(classId);

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("payments.alerts.deleteSuccess"));
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
      confirmButtonText={t("payments.alerts.deleteButton")}
      title={t("payments.alerts.deleteTitle")}
      description={t("payments.alerts.deleteDesc")}
      isPending={isPending}
    />
  );
};

export default PaymentsDeleteAlert;
