import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useTeacherCreateForm } from "../hooks/forms/useTeacherCreateForm";
import TeachersForm from "../components/form/TeachersForm";

const TeachersCreatePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("teachers.createTitle"),
    params: [
      {
        name: t("teachers.title"),
        link: "/teachers",
      },
      {
        name: t("teachers.createBreadcrumb"),
        link: "/teachers/create",
      },
    ],
  });

  const {
    form,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    createTeacher,
    resetForm,
  } = useTeacherCreateForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("teachers.createTitle")} />
      <TeachersForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createTeacher}
        confirmButtonText={t("teachers.alerts.createConfirmButton")}
        title={t("teachers.alerts.createConfirmTitle")}
        description={t("teachers.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default TeachersCreatePage;
