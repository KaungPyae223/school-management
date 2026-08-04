import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { useDeletePayment } from "../hooks/useDeletePayment";

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
  const { mutateAsync, isPending } = useDeletePayment(classId);

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Payment deleted successfully");
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
      title="Delete this payment?"
      description="Please confirm that you want to delete this payment. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default PaymentsDeleteAlert;
