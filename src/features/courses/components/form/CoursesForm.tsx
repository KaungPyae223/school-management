import { Controller, type UseFormReturn } from "react-hook-form";
import type { CoursesFormValues } from "../../schema/useCoursesSchema";
import { useTranslation } from "react-i18next";
import { CardContent } from "../../../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import ImageInput from "../../../../components/form/ImageInput";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";
import NumberInput from "../../../../components/form/NumberInput";
import { Textarea } from "../../../../components/ui/textarea";
import FormFooter from "../../../../components/form/FormFooter";

const CoursesForm = ({
  form,
  errorMessage,
  isPending,
  onSubmit,
  resetForm,
  oldImageURL,
}: {
  form: UseFormReturn<CoursesFormValues>;
  errorMessage: string;
  isPending: boolean;
  onSubmit: () => void;
  resetForm: () => void;
  oldImageURL?: string;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <CardContent>
        <form id="course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <ImageInput
                  label={t("courses.fields.image")}
                  id="image"
                  field={field}
                  fieldState={fieldState}
                  oldImageURL={oldImageURL}
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
        formID="course-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
    </>
  );
};

export default CoursesForm;
