import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import RequiredLabel from "../../../components/form/RequiredLabel";
import TimeInput from "../../../components/form/TimeInput";
import DateInput from "../../../components/form/DateInput";
import ClassesCourseInput from "../components/forms/ClassesCourseInput";
import ClassesTeacherInput from "../components/forms/ClassesTeacherInput";
import ClassesDayInput from "../components/forms/ClassesDayInput";
import { toast } from "sonner";
import FormError from "../../../components/form/FormError";
import { useEditClass } from "../hooks/api/useEditClass";
import { useLoaderData } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useClassesSchema } from "../schema/useClassesSchema";
import { translateError } from "../../../utils/translate-error";

const ClassesEditPage = () => {
  const { t } = useTranslation();
  const classData = useLoaderData();
  const { formSchema } = useClassesSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: classData.teacher.id,
      courseId: classData.course.id,
      startDate: classData.startDate,
      startTime: classData.startTime,
      endTime: classData.endTime,
      days: classData.days,
      description: classData.description ?? "",
      price: classData.price,
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useEditClass();

  const editClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data);

      toast.success(t("classes.alerts.editSuccess"));
      form.reset();
    } catch (error: unknown) {
      const msg = translateError(error, t);
      toast.error(msg);
      setErrorMessage(msg);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

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
