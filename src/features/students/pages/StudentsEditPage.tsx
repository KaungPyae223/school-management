import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import * as z from "zod";

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
import { useLoaderData, useNavigate } from "react-router";
import { useEditStudent } from "../hooks/useEditStudent";
import DateInput from "../../../components/form/DateInput";
import FormError from "../../../components/form/FormError";
import { StudentsSchema } from "../schema/StudentsSchema";
import { translateError } from "../../../utils/translate-error";

const StudentEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const student = useLoaderData();

  const formSchema = StudentsSchema();

  useAddBreadcrumb({
    title: t("students.editTitle"),
    params: [
      {
        name: t("students.title"),
        link: "/students",
      },
      {
        name: t("students.editBreadcrumb"),
        link: "/students/edit",
      },
    ],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: student.name,
      address: student.address ?? "",
      email: student.email ?? "",
      phone: student.phone,
      dob: student.dob ?? undefined,
      gender: student.gender ?? undefined,
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useEditStudent();

  const editStudent = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
        id: student.id,
      });

      toast.success(t("students.alerts.editSuccess"));
      navigate("/students");
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
      <FormHeader title={t("students.editTitle")} />
      <CardContent>
        <form id="edit-student-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Controller
              control={form.control}
              name={"image"}
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
                  <RequiredLabel id={"name"}>
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
                  <RequiredLabel id={"phone"}>
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
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="dob"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="dob">
                      {t("students.fields.dob")}
                    </FieldLabel>
                    <DateInput
                      ariaInvalid={fieldState.invalid}
                      field={field}
                      label={t("students.fields.pickDob")}
                      disabledDate={(date) => date >= new Date()}
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
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue
                          placeholder={t("students.fields.selectGender")}
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
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        resetForm={resetForm}
        formID="edit-student-form"
        isSubmitting={isPending}
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

export default StudentEdit;
