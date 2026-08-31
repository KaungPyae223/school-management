import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import ImageInput from "../../../components/form/ImageInput";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import RequiredLabel from "../../../components/form/RequiredLabel";
import FormError from "../../../components/form/FormError";
import { useLoaderData } from "react-router";
import { useTeacherEditForm } from "../hooks/forms/useTeacherEditForm";
import TeacherForm from "../components/form/TeacherForm";

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
      <TeacherForm
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
