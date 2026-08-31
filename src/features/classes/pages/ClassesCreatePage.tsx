import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Textarea } from "../../../components/ui/textarea";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import RequiredLabel from "../../../components/form/RequiredLabel";
import TimeInput from "../../../components/form/TimeInput";
import DateInput from "../../../components/form/DateInput";
import FormError from "../../../components/form/FormError";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

import ClassesCourseInput from "../components/forms/ClassesCourseInput";
import ClassesTeacherInput from "../components/forms/ClassesTeacherInput";
import ClassesDayInput from "../components/forms/ClassesDayInput";
import { useClassCreateForm } from "../hooks/forms/useClassCreateForm";

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
      <CardContent>
        <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              name="courseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesCourseInput
                  field={field}
                  fieldState={fieldState}
                  setValue={form.setValue}
                />
              )}
            />
            <Controller
              name="teacherId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesTeacherInput field={field} fieldState={fieldState} />
              )}
            />
            <Controller
              name="days"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="days">
                    {t("classes.fields.days")}
                  </RequiredLabel>
                  <ClassesDayInput field={field} fieldState={fieldState} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="startDate">
                    {t("classes.fields.startDate")}
                  </RequiredLabel>

                  <DateInput
                    field={field}
                    label={t("classes.fields.startDate")}
                    ariaInvalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="startTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="startTime">
                      {t("classes.fields.startTime")}
                    </RequiredLabel>

                    <TimeInput
                      field={field}
                      fieldState={fieldState}
                      id="startTime"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="endTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="endTime">
                      {t("classes.fields.endTime")}
                    </RequiredLabel>
                    <TimeInput
                      field={field}
                      fieldState={fieldState}
                      id="endTime"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="classDescription">
                    {t("classes.fields.description")}
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="classDescription"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("classes.fields.descriptionPlaceholder")}
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
        formID="create-class-form"
        isSubmitting={isPending}
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
