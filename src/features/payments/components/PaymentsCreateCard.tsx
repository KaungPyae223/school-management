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

const formSchema = z.object({
  amount: z.number().min(1, "Amount is required"),
  description: z.string().optional(),
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
});

const PaymentsCreateCard = ({
  amountDue,
  classId,
  enrollmentId,
}: {
  amountDue: number;
  classId: number;
  enrollmentId: number;
}) => {
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
        toast.error("You pay exceed the amount due");
        return;
      }

      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        image: imageData,
        enrollmentId: enrollmentId,
      });

      toast.success("Payment created successfully");
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
        <CardTitle className="text-lg">Create Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="enroll-class" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <Label>Amount Due</Label>
              <Input value={amountDue} readOnly />
            </Field>
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="amount">Paid Amount</RequiredLabel>
                  <NumberInput
                    field={field}
                    fieldState={fieldState}
                    id="amount"
                    placeholder="Enter paid amount"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {amountWatch && amountDue - amountWatch != 0 && (
              <Field>
                <Label>Remain Amount</Label>
                <Input value={amountDue - amountWatch} readOnly />
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
        title="Create Payment?"
        description="Please confirm that you want to create payment with the provided information."
      />
    </Card>
  );
};

export default PaymentsCreateCard;
