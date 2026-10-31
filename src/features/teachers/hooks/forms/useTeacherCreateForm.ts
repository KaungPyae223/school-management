import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useTeachersSchema } from "../../schema/useTeachersSchema";
import { useCreateTeacher } from "../api/useCreateTeacher";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

export const useTeacherCreateForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useTeachersSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      address: "",
      email: "",
      phone: "",
      nrc: "",
    },
  });

  const { mutateAsync, isPending } = useCreateTeacher();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const createTeacher = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        phone: data.phone?.trim() || null,
        email: data.email?.trim() || null,
        nrc: data.nrc?.trim() || null,
        ...imageData,
      });

      toast.success(t("teachers.alerts.createSuccess"));
      form.reset();
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

  return {
    form,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    createTeacher,
    resetForm,
  };
};
