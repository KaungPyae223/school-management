import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useNavigate } from "react-router";

const StudentDeleteAlert = ({
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
  const { mutateAsync, isPending } = useDeleteStudent();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("student deleted successfully");
      if (back) {
        navigate(-1);
      }
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
      title="Delete this student?"
      description="Please confirm that you want to delete this student. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default StudentDeleteAlert;
