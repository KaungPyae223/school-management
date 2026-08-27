import { useState } from "react";
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useEnrollClass } from "../api/useEnrollClass";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

export const enrollFormSchema = z.object({
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
      }
    )
    .optional(),
  description: z.string().optional(),
});

export type EnrollFormValues = z.infer<typeof enrollFormSchema>;

export const useEnrollForm = () => {
  const { t } = useTranslation();
  const data = useLoaderData() as any;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<EnrollFormValues>({
    resolver: zodResolver(enrollFormSchema),
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
      const values = form.getValues();

      if (values.price < values.amount) {
        toast.error(t("payments.exceedAmountDue"));
        return;
      }

      const imageData = await generateImageData(values.image);

      await mutateAsync({
        ...values,
        image: imageData,
      });

      toast.success(t("enroll.alerts.success"));
      form.reset();
    } catch (error: unknown) {
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

  return {
    data,
    form,
    amountWatch,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    enrollClass,
    resetForm,
  };
};
