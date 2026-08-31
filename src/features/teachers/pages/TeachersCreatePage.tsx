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
import { useTeacherCreateForm } from "../hooks/forms/useTeacherCreateForm";

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
      <CardContent>
        <form id="create-teacher-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <ImageInput
                  label={t("teachers.fields.image")}
                  id="image"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="name">
                    {t("teachers.fields.name")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("teachers.fields.namePlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="phone">
                    {t("teachers.fields.phone")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("teachers.fields.phonePlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="email">
                    {t("teachers.fields.email")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("teachers.fields.emailPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="nrc"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nrc">
                    {t("teachers.fields.nrc")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="nrc"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("teachers.fields.nrcPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address">
                    {t("teachers.fields.address")}
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="address"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("teachers.fields.addressPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        formID="create-teacher-form"
        isSubmitting={isPending}
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
