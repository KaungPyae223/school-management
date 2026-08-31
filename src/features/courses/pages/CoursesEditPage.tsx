import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useLoaderData } from "react-router";
import { useCourseEditForm } from "../hooks/forms/useCourseEditForm";
import CoursesForm from "../components/form/CoursesForm";

const CourseEditPage = () => {
  const { t } = useTranslation();
  const course = useLoaderData() as any;

  useAddBreadcrumb({
    title: t("courses.editBreadcrumb"),
    params: [
      {
        name: t("courses.title"),
        link: "/courses",
      },
      {
        name: t("courses.editBreadcrumb"),
        link: `/courses/edit/${course.id}`,
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
    editCourse,
    resetForm,
  } = useCourseEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("courses.editTitle")} />
      <CoursesForm
        oldImageURL={course.image}
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editCourse}
        confirmButtonText={t("courses.alerts.editConfirmButton")}
        title={t("courses.alerts.editConfirmTitle")}
        description={t("courses.alerts.editConfirmDesc")}
      />
    </Card>
  );
};

export default CourseEditPage;
