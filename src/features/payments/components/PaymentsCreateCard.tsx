import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { generateImageData } from "../../../utils/generate-image-data";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import FormFooter from "../../../components/form/FormFooter";
import {
  FieldGroup,
  FieldError,
  Field,
  FieldLabel,
} from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import ImageInput from "../../../components/form/ImageInput";
import { Textarea } from "../../../components/ui/textarea";
import { useCreatePayment } from "../hooks/useCreatePayment";
import NumberInput from "../../../components/form/NumberInput";
import { PaymentsSchema } from "../schema/PaymentsSchema";

const PaymentsCreateCard = ({
  amountDue,
  classId,
  enrollmentId,
}: {
  amountDue: number;
  classId: number;
  enrollmentId: number;
}) => {
  const { t } = useTranslation();
  const { formSchema } = PaymentsSchema();

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "" as undefined as number,
      image: undefined,
      description: "",
    },
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutateAsync, isPending } = useCreatePayment(classId);

  const enrollClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      if (amountDue < data.amount) {
        toast.error(t("payments.exceedAmountDue"));
        return;
      }

      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        image: imageData,
        enrollmentId: enrollmentId,
      });

      toast.success(t("payments.alerts.createSuccess"));
      form.reset();
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
      setErrorMessage((error as Error).message);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  const amountWatch = form.watch("amount");

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
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
                  <RequiredLabel id="amount">{t("payments.fields.amount")}</RequiredLabel>
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
            {amountWatch && amountDue - amountWatch != 0 && (
              <Field>
                <Label>{t("payments.fields.remainAmount")}</Label>
                <Input value={amountDue - amountWatch} readOnly />
              </Field>
            )}

            <Controller
              control={form.control}
              name={"image"}
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
                  <FieldLabel htmlFor="description">{t("payments.fields.description")}</FieldLabel>
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
        title={t("payments.alerts.createConfirmTitle")}
        description={t("payments.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default PaymentsCreateCard;
