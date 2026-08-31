import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useLoaderData } from "react-router";
import { useTeacherEditForm } from "../hooks/forms/useTeacherEditForm";
import TeachersForm from "../components/form/TeachersForm";

const TeachersEditPage = () => {
  const { t } = useTranslation();
  const teacher = useLoaderData() as any;

  useAddBreadcrumb({
    title: t("teachers.editTitle"),
    params: [
      {
        name: t("teachers.title"),
        link: "/teachers",
      },
      {
        name: t("teachers.editBreadcrumb"),
        link: `/teachers/edit/${teacher.id}`,
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
    editTeacher,
    resetForm,
  } = useTeacherEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("teachers.editTitle")} />
      <TeachersForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
        oldImageURL={teacher.image}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editTeacher}
        confirmButtonText={t("teachers.alerts.editConfirmButton")}
        title={t("teachers.alerts.editConfirmTitle")}
        description={t("teachers.alerts.editConfirmDesc")}
      />
    </Card>
  );
};

export default TeachersEditPage;
