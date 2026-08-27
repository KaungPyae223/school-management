import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useStudentsSchema } from "../../schema/useStudentsSchema";
import { useEditStudent } from "../api/useEditStudent";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

export const useStudentEditForm = () => {
  const { t } = useTranslation();
  const student = useLoaderData() as any;
  const navigate = useNavigate();
  const { formSchema } = useStudentsSchema();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: student.name,
      address: student.address ?? "",
      email: student.email ?? "",
      phone: student.phone,
      dob: student.dob ? new Date(student.dob) : undefined,
      gender: student.gender,
    },
  });

  const { mutateAsync, isPending } = useEditStudent();

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

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

  return {
    form,
    student,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editStudent,
    resetForm,
  };
};
