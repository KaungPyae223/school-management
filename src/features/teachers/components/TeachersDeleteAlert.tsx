import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteTeacher } from "../hooks/usseDeleteTeacher";

const TeacherDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useDeleteTeacher();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("teacher deleted successfully");
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
      title="Delete this teacher?"
      description="Please confirm that you want to delete this teacher. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default TeacherDeleteAlert;
