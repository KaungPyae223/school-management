import { useState } from "react";
import { useChangePasswordSchema } from "../../schema/useChangePasswordSchema";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLockForm } from "../../../auth/hooks/forms/useLockForm";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useChangePassword } from "../api/useChangePassword";

export const useChangePasswordForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useChangePasswordSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useChangePassword();

  const { isLocked, setCountdown, getLockoutMessage } =
    useLockForm(setErrorMessage);

  const changePassword = async () => {
    if (isLocked || isPending) return;

    try {
      const data = form.getValues();

      const res = await mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (res?.success) {
        toast.success(t("settings.changePassword.success"));
        form.reset();

        navigate("/settings");
        return;
      }

      if (res?.retryAfterSeconds) {
        setCountdown(res.retryAfterSeconds);
        setErrorMessage(getLockoutMessage(res.retryAfterSeconds));
      } else if (res?.remainingAttempts !== undefined) {
        setErrorMessage(
          t("auth.login.attemptsRemaining", {
            count: res.remainingAttempts,
          }),
        );
      } else if (
        res?.message ===
        "System clock tampering detected! Lockout penalty applied."
      ) {
        setErrorMessage(t("auth.login.systemClockTampered"));
      } else if (res?.message === "Failed to change password.") {
        setErrorMessage(t("settings.changePassword.failed"));
      } else {
        setErrorMessage(t("auth.login.incorrectPassword"));
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
    changePassword,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    resetForm,
    isLocked,
    isPending,
  };
};
