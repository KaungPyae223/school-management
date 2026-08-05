import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
  const data = useLoaderData();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useAddBreadcrumb({
    title: "Enroll Class",
    params: [
      {
        name: "Classes",
        link: "/classes",
      },
      {
        name: "Enroll",
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
        toast.error("You pay exceed the price");
        return;
      }

      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        image: imageData,
      });

      toast.success("Student enrolled successfully");
      form.reset();
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
      setErrorMessage((error as Error).message);
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
      <FormHeader title="Enroll Class" />
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
                  <RequiredLabel id="amount">Amount</RequiredLabel>
                  <NumberInput
                    field={field}
                    fieldState={fieldState}
                    id="amount"
                    placeholder="Enter amount"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {amountWatch && data.price - amountWatch != 0 && (
              <Field>
                <Label>Remain Amount</Label>
                <Input value={data.price - amountWatch} readOnly />
              </Field>
            )}

            <Controller
              control={form.control}
              name={"image"}
              render={({ field, fieldState }) => (
                <ImageInput
                  label="Payment Receipt"
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
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter payment description"
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
        title="Enroll in this class?"
        description="Please confirm that you want to enroll in this class with the provided information. You can edit the class later if needed."
      />
    </Card>
  );
};

export default EnrollPage;
