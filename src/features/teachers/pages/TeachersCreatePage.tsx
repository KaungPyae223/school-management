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
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import ImageInput from "../../../components/form/ImageInput";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { generateImageData } from "../../../utils/generate-image-data";
import { useCreateTeacher } from "../hooks/useCreateTeacher";
import RequiredLabel from "../../../components/form/RequiredLabel";
import FormError from "../../../components/form/FormError";
import { TeachersSchema } from "../schema/TeachersSchema";
import { translateError } from "../../../utils/translate-error";

const TeachersCreatePage = () => {
  const { t } = useTranslation();
  const { formSchema } = TeachersSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      address: "",
      email: "",
      phone: "",
      nrc: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useCreateTeacher();

  const createTeacher = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
      });

      toast.success(t("teachers.alerts.createSuccess"));
      form.reset();
    } catch (error: any) {
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
      <FormHeader title={t("teachers.createTitle")} />
      <CardContent>
        <form id="create-teacher-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Controller
              control={form.control}
              name={"image"}
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
                  <RequiredLabel id={"name"}>
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
                  <RequiredLabel id={"phone"}>
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
                  <FieldLabel htmlFor="email">
                    {t("teachers.fields.email")}
                  </FieldLabel>
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
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id={"address"}>
                    {t("teachers.fields.address")}
                  </RequiredLabel>
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
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        resetForm={resetForm}
        formID="create-teacher-form"
        isSubmitting={isPending}
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
