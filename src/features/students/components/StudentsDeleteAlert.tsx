import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeleteStudent();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
      toast.success(t("students.alerts.deleteSuccess"));
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
      title={t("students.alerts.deleteTitle")}
      description={t("students.alerts.deleteDesc")}
      isPending={isPending}
    />
  );
};

export default StudentDeleteAlert;
