import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteEnrollment } from "../../classes/hooks/useDeleteEnrollment";

const StudentsEnrolledClassesDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useDeleteEnrollment(id);

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Enrollment deleted successfully");
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
      title="Delete this enrollment?"
      description="Please confirm that you want to delete this enrollment. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default StudentsEnrolledClassesDeleteAlert;
