import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useResetPasswordSchema } from "../../schema/useResetPasswordSchema";
import { useResetPassword } from "../api/useResetPassword";

export const useResetPasswordForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useResetPasswordSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useResetPassword();

  const resetPassword = async () => {
    try {
      const data = form.getValues();

      const res = await mutateAsync(data.newPassword);

      if (res?.success) {
        toast.success(t("auth.resetPassword.success"));
        form.reset();

        navigate("/login");
        return;
      } else {
        toast.error(res.message);
        setErrorMessage(res.message);
      }
    } catch (err) {
      setErrorMessage(t("auth.login.unexpectedError"));
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    onSubmit,
    resetPassword,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    resetForm,
    isPending,
  };
};
