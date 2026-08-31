import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import {
  FieldGroup,
  FieldError,
  Field,
  FieldLabel,
} from "../../../components/ui/field";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import FormError from "../../../components/form/FormError";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import ImageInput from "../../../components/form/ImageInput";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import NumberInput from "../../../components/form/NumberInput";

import EnrollClassDataCard from "../components/details/EnrollClassDataCard";
import EnrollStudentInput from "../components/forms/EnrollStudentInput";
import { useEnrollForm } from "../hooks/forms/useEnrollForm";

const EnrollPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("enroll.title"),
    params: [
      {
        name: t("classes.title"),
        link: "/classes",
      },
      {
        name: t("enroll.breadcrumb"),
        link: "/enroll",
      },
    ],
  });

  const {
    data,
    form,
    amountWatch,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    enrollClass,
    resetForm,
  } = useEnrollForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("enroll.title")} />
      <CardContent>
        <form id="enroll-class" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <EnrollClassDataCard data={data} />
            <Controller
              name="studentId"
              control={form.control}
              render={({ field, fieldState }) => (
                <EnrollStudentInput field={field} fieldState={fieldState} />
              )}
            />
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="amount">
                    {t("payments.fields.amount")}
                  </RequiredLabel>
                  <NumberInput
                    field={field}
                    fieldState={fieldState}
                    id="amount"
                    placeholder={t("payments.fields.amountPlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {amountWatch && data.price - amountWatch !== 0 && (
              <Field>
                <Label>{t("payments.fields.remainAmount")}</Label>
                <Input value={data.price - amountWatch} readOnly />
              </Field>
            )}

            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <ImageInput
                  label={t("payments.fields.image")}
                  id="image"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    {t("payments.fields.description")}
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("payments.fields.descriptionPlaceholder")}
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
        formID="enroll-class"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={enrollClass}
        confirmButtonText={t("enroll.alerts.confirmButton")}
        title={t("enroll.alerts.confirmTitle")}
        description={t("enroll.alerts.confirmDesc")}
      />
    </Card>
  );
};

export default EnrollPage;
