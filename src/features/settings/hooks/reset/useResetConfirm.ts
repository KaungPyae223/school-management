import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { translateError } from "../../../../utils/translate-error";
import { toast } from "sonner";
import { useResetData } from "../api/useResetData";
import { useResetImportSchema } from "../../schema/useResetImportSchema";

export const useResetConfirm = () => {
  const { t } = useTranslation();
  const { formSchema } = useResetImportSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmText, setConfirmText] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useResetData();

  const resetData = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data.password);

      toast.success(t("settings.reset.success"));
      form.reset();
      navigate(-1);
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
    onSubmit,
    resetData,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
    confirmText,
    setConfirmText,
  };
};
