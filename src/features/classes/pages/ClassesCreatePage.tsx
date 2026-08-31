import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useClassCreateForm } from "../hooks/forms/useClassCreateForm";
import ClassesForm from "../components/forms/ClassesForm";

const ClassesCreatePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("classes.createBreadcrumb"),
    params: [
      {
        name: t("classes.title"),
        link: "/classes",
      },
      {
        name: t("classes.createBreadcrumb"),
        link: "/classes/create",
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
    createClass,
    resetForm,
  } = useClassCreateForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("classes.createTitle")} />
      <ClassesForm
        form={form}
        errorMessage={errorMessage}
        isPending={isPending}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createClass}
        title={t("classes.alerts.createConfirmTitle")}
        description={t("classes.alerts.createConfirmDesc")}
        confirmButtonText={t("classes.alerts.createConfirmButton")}
      />
    </Card>
  );
};

export default ClassesCreatePage;
