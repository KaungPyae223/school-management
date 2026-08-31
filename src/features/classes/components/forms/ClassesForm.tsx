import { Controller, type UseFormReturn } from "react-hook-form";
import type { ClassesFormValues } from "../../schema/useClassesSchema";
import { useTranslation } from "react-i18next";
import { CardContent } from "../../../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import { Textarea } from "../../../../components/ui/textarea";
import FormError from "../../../../components/form/FormError";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import TimeInput from "../../../../components/form/TimeInput";
import DateInput from "../../../../components/form/DateInput";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import ClassesCourseInput from "./ClassesCourseInput";
import ClassesTeacherInput from "./ClassesTeacherInput";
import ClassesDayInput from "./ClassesDayInput";
import FormFooter from "../../../../components/form/FormFooter";

const ClassesForm = ({
  form,
  errorMessage,
  isPending,
  onSubmit,
  resetForm,
  classData,
}: {
  form: UseFormReturn<ClassesFormValues>;
  errorMessage: string;
  isPending: boolean;
  onSubmit: () => void;
  resetForm: () => void;
  classData?: any;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <CardContent>
        <form id="class-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            {classData && (
              <Field>
                <Label>{t("students.batch")}</Label>
                <Input value={classData.batch} readOnly />
              </Field>
            )}

            <Controller
              name="courseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesCourseInput
                  field={field}
                  fieldState={fieldState}
                  setValue={form.setValue}
                  defaultSelectedCourse={
                    classData?.course
                      ? {
                          id: classData.course.id,
                          image: classData.course_image,
                          price: classData.price,
                          name: classData.course.name,
                        }
                      : undefined
                  }
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
                  defaultSelectedTeacher={
                    classData?.teacher
                      ? {
                          id: classData.teacher.id,
                          image: classData.teacher_image,
                          name: classData.teacher.name,
                        }
                      : undefined
                  }
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
        formID="class-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
    </>
  );
};

export default ClassesForm;
