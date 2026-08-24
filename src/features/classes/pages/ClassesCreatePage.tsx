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
import ClassesCourseInput from "../components/ClassesCourseInput";
import ClassesTeacherInput from "../components/ClassesTeacherInput";
import ClassesDayInput from "../components/ClassesDayInput";
import { useCreateClass } from "../hooks/useCreateClass";
import { toast } from "sonner";
import FormError from "../../../components/form/FormError";
import { ClassesSchema } from "../schema/ClassesSchema";
import { translateError } from "../../../utils/translate-error";

const ClassesCratePage = () => {
  const { t } = useTranslation();
  const { formSchema } = ClassesSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: "" as unknown as number,
      teacherId: "" as unknown as number,
      startDate: new Date(),
      endDate: new Date(),
      startTime: "",
      endTime: "",
      days: [],
      description: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useCreateClass();

  const createClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data);

      toast.success(t("classes.alerts.createSuccess"));
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
                  <RequiredLabel id="days">{t("classes.fields.days")}</RequiredLabel>
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
                  <RequiredLabel id="startDate">{t("classes.fields.startDate")}</RequiredLabel>

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
                    <RequiredLabel id="startTime">{t("classes.fields.startTime")}</RequiredLabel>

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
                    <RequiredLabel id="endTime">{t("classes.fields.endTime")}</RequiredLabel>
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

export default ClassesCratePage;
