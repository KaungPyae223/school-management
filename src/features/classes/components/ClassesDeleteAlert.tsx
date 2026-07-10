import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteClass } from "../hooks/useDeleteClass";

const ClassesDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useDeleteClass();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Class deleted successfully");
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
      title="Delete this class?"
      description="Please confirm that you want to delete this class. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default ClassesDeleteAlert;
