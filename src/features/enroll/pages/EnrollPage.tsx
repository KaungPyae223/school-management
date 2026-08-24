import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import * as z from "zod";

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
import { useState } from "react";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { toast } from "sonner";
import FormError from "../../../components/form/FormError";
import { useLoaderData } from "react-router";

import EnrollClassDataCard from "../components/EnrollClassDataCard";
import EnrollStudentInput from "../components/EnrollStudentInput";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import ImageInput from "../../../components/form/ImageInput";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { useEnrollClass } from "../hooks/useEnrollClass";
import { generateImageData } from "../../../utils/generate-image-data";
import NumberInput from "../../../components/form/NumberInput";
import { translateError } from "../../../utils/translate-error";

const formSchema = z.object({
  classId: z.number().min(1, "Class is required"),
  studentId: z.number().min(1, "Student is required"),
  amount: z.number().min(1, "Amount is required"),
  price: z.number().min(1, "Price is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      },
    )
    .optional(),
  description: z.string().optional(),
});
const EnrollPage = () => {
  const { t } = useTranslation();
  const data = useLoaderData();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: data.id,
      price: data.price,
      studentId: 0,
      amount: "" as unknown as number,
      image: undefined,
      description: "",
    },
  });

  const { mutateAsync, isPending } = useEnrollClass(data.id);

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const enrollClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      if (data.price < data.amount) {
        toast.error(t("payments.exceedAmountDue"));
        return;
      }

      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        image: imageData,
      });

      toast.success(t("enroll.alerts.success"));
      form.reset();
    } catch (error: unknown) {
      console.log(error);
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

  const amountWatch = form.watch("amount");

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
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
            {amountWatch && data.price - amountWatch != 0 && (
              <Field>
                <Label>{t("payments.fields.remainAmount")}</Label>
                <Input value={data.price - amountWatch} readOnly />
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

