import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useClassesSchema } from "../../schema/useClassesSchema";
import { useCreateClass } from "../api/useCreateClass";
import { translateError } from "../../../../utils/translate-error";

export const useClassCreateForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useClassesSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: "" as unknown as number,
      teacherId: "" as unknown as number,
      startDate: new Date(),
      startTime: undefined,
      endTime: undefined,
      days: undefined,
      description: undefined,
    },
  });

  const { mutateAsync, isPending } = useCreateClass();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const createClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      await mutateAsync(data);
      toast.success(t("classes.alerts.createSuccess"));
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

  return {
    form,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    createClass,
    resetForm,
  };
};
