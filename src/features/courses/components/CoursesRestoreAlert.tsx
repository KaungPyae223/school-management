import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useRestoreCourse } from "../hooks/useRestoreCourse";
import { useNavigate } from "react-router";

const CoursesRestoreAlert = ({
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
  const { mutateAsync, isPending } = useRestoreCourse();
  const navigate = useNavigate();

  const handleRestore = async () => {
    try {
      await mutateAsync(id);
      toast.success("Course restored successfully");
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
      title="Restore this course?"
      description="Please confirm that you want to restore this course. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default CoursesRestoreAlert;
