import { Controller, type UseFormReturn } from "react-hook-form";
import type { StudentsFormValues } from "../../schema/useStudentsSchema";
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
import { Textarea } from "../../../../components/ui/textarea";
import DateInput from "../../../../components/form/DateInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import FormFooter from "../../../../components/form/FormFooter";

const StudentsForm = ({
  form,
  errorMessage,
  isPending,
  onSubmit,
  resetForm,
  oldImageURL,
}: {
  form: UseFormReturn<StudentsFormValues>;
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
        <form id="student-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <ImageInput
                  label={t("students.fields.image")}
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
                    {t("students.fields.name")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("students.fields.namePlaceholder")}
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
                  <RequiredLabel id="phone">
                    {t("students.fields.phone")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("students.fields.phonePlaceholder")}
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
                    {t("students.fields.email")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("students.fields.emailPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="dob"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="dob">
                      {t("students.fields.dob")}
                    </FieldLabel>
                    <DateInput
                      field={field}
                      label={t("students.fields.dob")}
                      ariaInvalid={fieldState.invalid}
                      yearDropDown
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="gender">
                      {t("students.fields.gender")}
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t("students.fields.genderPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {t("students.fields.gender")}
                          </SelectLabel>
                          <SelectItem value="MALE">
                            {t("students.fields.male")}
                          </SelectItem>
                          <SelectItem value="FEMALE">
                            {t("students.fields.female")}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address">
                    {t("students.fields.address")}
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="address"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("students.fields.addressPlaceholder")}
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
        formID="student-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
    </>
  );
};

export default StudentsForm;
