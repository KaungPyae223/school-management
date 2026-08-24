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
import { useCreateCourse } from "../hooks/useCreateCourse";
import { generateImageData } from "../../../utils/generate-image-data";
import RequiredLabel from "../../../components/form/RequiredLabel";
import FormError from "../../../components/form/FormError";
import NumberInput from "../../../components/form/NumberInput";
import { CoursesSchema } from "../schema/CoursesSchema";
import { translateError } from "../../../utils/translate-error";

const CoursesCreatePage = () => {
  const { t } = useTranslation();
  const { formSchema } = CoursesSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useAddBreadcrumb({
    title: t("courses.createTitle"),
    params: [
      {
        name: t("courses.title"),
        link: "/courses",
      },
      {
        name: t("courses.createBreadcrumb"),
        link: "/courses/create",
      },
    ],
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      description: "",
      price: "" as unknown as number,
    },
  });

  const { mutateAsync, isPending } = useCreateCourse();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const createCourse = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
      });

      toast.success(t("courses.alerts.createSuccess"));
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
      <FormHeader title={t("courses.createTitle")} />
      <CardContent>
        <form id="create-course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              control={form.control}
              name={"image"}
              render={({ field, fieldState }) => (
                <ImageInput
                  label={t("courses.fields.image")}
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
                  <RequiredLabel id="name">
                    {t("courses.fields.name")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("courses.fields.namePlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="price">
                    {t("courses.fields.price")}
                  </RequiredLabel>
                  <NumberInput
                    field={field}
                    fieldState={fieldState}
                    id="price"
                    placeholder={t("courses.fields.pricePlaceholder")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    {t("courses.fields.description")}
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("courses.fields.descriptionPlaceholder")}
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
        formID="create-course-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createCourse}
        isPending={isPending}
        confirmButtonText={t("courses.alerts.createConfirmButton")}
        title={t("courses.alerts.createConfirmTitle")}
        description={t("courses.alerts.createConfirmDesc")}
      />
    </Card>
  );
};

export default CoursesCreatePage;
