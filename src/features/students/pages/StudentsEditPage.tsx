import { Controller } from "react-hook-form";
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
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import RequiredLabel from "../../../components/form/RequiredLabel";
import DateInput from "../../../components/form/DateInput";
import FormError from "../../../components/form/FormError";
import { useLoaderData } from "react-router";
import { useStudentEditForm } from "../hooks/forms/useStudentEditForm";

const StudentsEditPage = () => {
  const { t } = useTranslation();
  const student = useLoaderData() as any;

  useAddBreadcrumb({
    title: t("students.editBreadcrumb"),
    params: [
      {
        name: t("students.title"),
        link: "/students",
      },
      {
        name: t("students.editBreadcrumb"),
        link: `/students/edit/${student.id}`,
      },
    ],
  });

  const {
    form,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editStudent,
    resetForm,
  } = useStudentEditForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("students.editTitle")} />
      <CardContent>
        <form id="create-student-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                  oldImageURL={student.image}
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
        formID="create-student-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editStudent}
        confirmButtonText={t("students.alerts.editConfirmButton")}
        title={t("students.alerts.editConfirmTitle")}
        description={t("students.alerts.editConfirmDesc")}
      />
    </Card>
  );
};

export default StudentsEditPage;
