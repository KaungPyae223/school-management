import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { useRestoreTeacher } from "../hooks/useRestoreTeacher";

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
  const { mutateAsync, isPending } = useRestoreTeacher();

  const navigate = useNavigate();

  const handleRestore = async () => {
    try {
      await mutateAsync(id);
      toast.success("teacher restored successfully");
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
      onConfirm={handleRestore}
      variant="default"
      title="Restore this teacher?"
      description="Please confirm that you want to restore this teacher. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default TeachersRestoreAlert;
