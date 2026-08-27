import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { usePaymentsSchema } from "../../schema/usePaymentsSchema";
import { useCreatePayment } from "../api/useCreatePayment";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

interface UsePaymentCreateFormProps {
  amountDue: number;
  classId: number;
  enrollmentId: number;
}

export const usePaymentCreateForm = ({
  amountDue,
  classId,
  enrollmentId,
}: UsePaymentCreateFormProps) => {
  const { t } = useTranslation();
  const { formSchema } = usePaymentsSchema();

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
        toast.error(t("payments.exceedAmountDue"));
        return;
      }

      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        image: imageData,
        enrollmentId,
      });

      toast.success(t("payments.alerts.createSuccess"));
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

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  const amountWatch = form.watch("amount");

  return {
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
