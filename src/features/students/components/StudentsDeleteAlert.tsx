import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteStudent } from "../hooks/usseDeleteStudent";

const StudentDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useDeleteStudent();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("student deleted successfully");
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
