import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { useDeleteEnrollment } from "../../classes/hooks/useDeleteEnrollment";

const StudentsEnrolledClassesDeleteAlert = ({
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
  const { mutateAsync, isPending } = useDeleteEnrollment(id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Enrollment deleted successfully");
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
      title="Delete this enrollment?"
      description="Please confirm that you want to delete this enrollment. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default StudentsEnrolledClassesDeleteAlert;
