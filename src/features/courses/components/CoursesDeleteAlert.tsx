import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useDeleteCourse } from "../hooks/useDeleteCourse";

const CoursesDeleteAlert = ({
  id,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: {
  id: number;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync, isPending } = useDeleteCourse();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Course deleted successfully");
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
      title="Delete this course?"
      description="Please confirm that you want to delete this course. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default CoursesDeleteAlert;
