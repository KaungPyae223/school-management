import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useCompleteClass } from "../hooks/useCompleteClass";
import { useNavigate } from "react-router";

const ClassesCompleteAlert = ({
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
  const { mutateAsync, isPending } = useCompleteClass();
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      await mutateAsync(id);
      toast.success("Class completed successfully");
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
      onConfirm={handleComplete}
      variant="default"
      title="Complete this class?"
      description="Please confirm that you want to complete this class. This action cannot be undone."
      isPending={isPending}
    />
  );
};

export default ClassesCompleteAlert;
