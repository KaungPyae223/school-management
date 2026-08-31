import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useLoaderData } from "react-router";
import { useStudentEditForm } from "../hooks/forms/useStudentEditForm";
import StudentsForm from "../components/form/StudentsForm";

const StudentsEditPage = () => {
  const { t } = useTranslation();
  const student = useLoaderData() as any;

  useAddBreadcrumb({
    title: t("students.editBreadcrumb"),
    params: [
      {
        name: t("students.title"),
        link: "/students",
      },
      {
        name: t("students.editBreadcrumb"),
        link: `/students/edit/${student.id}`,
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
    editStudent,
    resetForm,
  } = useStudentEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("students.editTitle")} />
      <StudentsForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
        oldImageURL={student.image}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editStudent}
        confirmButtonText={t("students.alerts.editConfirmButton")}
        title={t("students.alerts.editConfirmTitle")}
        description={t("students.alerts.editConfirmDesc")}
      />
    </Card>
  );
};

export default StudentsEditPage;
