import { Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import FormFooter from "../../../../components/form/FormFooter";
import {
  FieldGroup,
  FieldError,
  Field,
  FieldLabel,
} from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import ImageInput from "../../../../components/form/ImageInput";
import { Textarea } from "../../../../components/ui/textarea";
import { useTranslation } from "react-i18next";
import NumberInput from "../../../../components/form/NumberInput";
import { usePaymentCreateForm } from "../../hooks/forms/usePaymentCreateForm";

interface PaymentsCreateCardProps {
  amountDue: number;
  classId: number;
  enrollmentId: number;
}

const PaymentsCreateCard = ({
  amountDue,
  classId,
  enrollmentId,
}: PaymentsCreateCardProps) => {
  const { t } = useTranslation();
  const {
    form,
    amountWatch,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    enrollClass,
    resetForm,
  } = usePaymentCreateForm({ amountDue, classId, enrollmentId });

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg">{t("payments.createPayment")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="enroll-class" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <Label>{t("payments.fields.amountDue")}</Label>
              <Input value={amountDue} readOnly />
            </Field>
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
            {amountWatch && amountDue - amountWatch !== 0 && (
              <Field>
                <Label>{t("payments.fields.remainAmount")}</Label>
                <Input value={amountDue - amountWatch} readOnly />
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
        confirmButtonText={t("payments.alerts.createConfirmButton")}
        title={t("payments.alerts.createConfirmTitle")}
        description={t("payments.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default PaymentsCreateCard;
