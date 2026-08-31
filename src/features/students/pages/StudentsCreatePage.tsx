import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useStudentCreateForm } from "../hooks/forms/useStudentCreateForm";
import StudentsForm from "../components/form/StudentsForm";

const StudentsCreatePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("students.createTitle"),
    params: [
      {
        name: t("students.title"),
        link: "/students",
      },
      {
        name: t("students.createBreadcrumb"),
        link: "/students/create",
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
    createStudent,
    resetForm,
  } = useStudentCreateForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("students.createTitle")} />
      <StudentsForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createStudent}
        confirmButtonText={t("students.alerts.createConfirmButton")}
        title={t("students.alerts.createConfirmTitle")}
        description={t("students.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default StudentsCreatePage;
