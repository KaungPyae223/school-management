import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useTeachersSchema } from "../../schema/useTeachersSchema";
import { useEditTeacher } from "../api/useEditTeacher";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

export const useTeacherEditForm = () => {
  const { t } = useTranslation();
  const teacher = useLoaderData() as any;
  const navigate = useNavigate();
  const { formSchema } = useTeachersSchema();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: teacher.name,
      address: teacher.address ?? "",
      email: teacher.email ?? "",
      phone: teacher.phone,
      nrc: teacher.nrc ?? "",
    },
  });

  const { mutateAsync, isPending } = useEditTeacher();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const editTeacher = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
        id: teacher.id,
      });

      toast.success(t("teachers.alerts.editSuccess"));
      navigate("/teachers");
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
    teacher,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editTeacher,
    resetForm,
  };
};
