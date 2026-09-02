import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useCoursesSchema } from "../../schema/useCoursesSchema";
import { useEditCourse } from "../api/useEditCourse";
import { generateImageData } from "../../../../utils/generate-image-data";
import { translateError } from "../../../../utils/translate-error";

export const useCourseEditForm = () => {
  const { t } = useTranslation();
  const course = useLoaderData() as any;
  const navigate = useNavigate();
  const { formSchema } = useCoursesSchema();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: course.name,
      price: course.price,
      description: course.description ?? "",
      image: undefined,
    },
  });

  const { mutateAsync, isPending } = useEditCourse(course.id);

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const editCourse = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
        id: course.id,
      });

      toast.success(t("courses.alerts.editSuccess"));
      navigate("/courses");
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
    course,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    isPending,
    onSubmit,
    editCourse,
    resetForm,
  };
};
