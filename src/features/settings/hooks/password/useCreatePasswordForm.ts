import { useTranslation } from "react-i18next";
import { useCreatePasswordSchema } from "../../schema/useCreatePasswordSchema";
import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { useCreatePassword } from "../api/useCreatePassword";
import { translateError } from "../../../../utils/translate-error";
import { toast } from "sonner";

export const useCreatePasswordForm = (navigateLink: string) => {
  const { t } = useTranslation();
  const { formSchema } = useCreatePasswordSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useCreatePassword();

  const createPassword = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data.password);

      toast.success(t("settings.createPassword.success"));
      form.reset();
      navigate(navigateLink);
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
    createPassword,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
  };
};
