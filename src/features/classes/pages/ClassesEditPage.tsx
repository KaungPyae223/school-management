import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData } from "react-router";
import { useClassEditForm } from "../hooks/forms/useClassEditForm";
import ClassesForm from "../components/forms/ClassesForm";

const ClassesEditPage = () => {
  const { t } = useTranslation();
  const classData = useLoaderData() as any;

  useAddBreadcrumb({
    title: t("classes.editBreadcrumb"),
    params: [
      {
        name: t("classes.title"),
        link: "/classes",
      },
      {
        name: t("classes.editBreadcrumb"),
        link: `/classes/edit/${classData.id}`,
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
    editClass,
    resetForm,
  } = useClassEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("classes.editTitle")} />
      <ClassesForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
        classData={classData}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editClass}
        title={t("classes.alerts.editConfirmTitle")}
        description={t("classes.alerts.editConfirmDesc")}
        confirmButtonText={t("classes.alerts.editConfirmButton")}
      />
    </Card>
  );
};

export default ClassesEditPage;
