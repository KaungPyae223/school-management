import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useCourseCreateForm } from "../hooks/forms/useCourseCreateForm";
import CoursesForm from "../components/form/CoursesForm";

const CoursesCreatePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("courses.createTitle"),
    params: [
      {
        name: t("courses.title"),
        link: "/courses",
      },
      {
        name: t("courses.createBreadcrumb"),
        link: "/courses/create",
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
    createCourse,
    resetForm,
  } = useCourseCreateForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("courses.createTitle")} />
      <CoursesForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createCourse}
        isPending={isPending}
        confirmButtonText={t("courses.alerts.createConfirmButton")}
        title={t("courses.alerts.createConfirmTitle")}
        description={t("courses.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default CoursesCreatePage;
