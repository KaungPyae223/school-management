import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useClassesSchema } from "../../schema/useClassesSchema";
import { useEditClass } from "../api/useEditClass";
import { translateError } from "../../../../utils/translate-error";

export const useClassEditForm = () => {
  const { t } = useTranslation();
  const classData = useLoaderData() as any;
  const { formSchema } = useClassesSchema(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: classData.teacher.id,
      courseId: classData.course.id,
      startDate: classData.startDate,
      startTime: classData.startTime,
      endTime: classData.endTime,
      days: classData.days,
      description: classData.description ?? "",
      price: classData.price,
    },
  });

  const { mutateAsync, isPending } = useEditClass();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const editClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      await mutateAsync({
        ...data,
        id: classData.id,
      });
      toast.success(t("classes.alerts.editSuccess"));
      form.reset();
      navigate(-1);
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
    classData,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editClass,
    resetForm,
  };
};
