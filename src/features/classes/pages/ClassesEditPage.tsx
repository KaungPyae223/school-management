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
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

import ClassesCourseInput from "../components/forms/ClassesCourseInput";
import ClassesTeacherInput from "../components/forms/ClassesTeacherInput";
import ClassesDayInput from "../components/forms/ClassesDayInput";
import { useClassEditForm } from "../hooks/forms/useClassEditForm";

const ClassesEditPage = () => {
  const { t } = useTranslation();

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
    classData,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editClass,
    resetForm,
  } = useClassEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={t("classes.editTitle")} />
      <CardContent>
        <form id="edit-class-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Field>
              <Label>{t("students.batch")}</Label>
              <Input value={classData.batch} readOnly />
            </Field>

            <Controller
              name="courseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesCourseInput
                  field={field}
                  fieldState={fieldState}
                  setValue={form.setValue}
                  defaultSelectedCourse={{
                    id: classData.course.id,
                    image: classData.course_image,
                    price: classData.price,
                    name: classData.course.name,
                  }}
                />
              )}
            />
            <Controller
              name="teacherId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesTeacherInput
                  field={field}
                  fieldState={fieldState}
                  defaultSelectedTeacher={{
                    id: classData.teacher.id,
                    image: classData.teacher_image,
                    name: classData.teacher.name,
                  }}
                />
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
        formID="edit-class-form"
        isSubmitting={isPending}
        resetForm={resetForm}
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
