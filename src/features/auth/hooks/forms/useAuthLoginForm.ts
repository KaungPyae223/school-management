import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useTranslation } from "react-i18next";
import { useLogin } from "../api/useLogin";
import { useLockForm } from "./useLockForm";
import { usePasswordSchema } from "../../schema/usePasswordSchema";

export const useAuthLoginForm = (navigateLink?: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formSchema } = usePasswordSchema();
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { mutateAsync, isPending } = useLogin();
  const { isLocked, setCountdown, getLockoutMessage } =
    useLockForm(setErrorMessage);

  const onSubmit = async (values: FormValues) => {
    if (isLocked || isPending) return;

    try {
      const res = await mutateAsync(values.password);

      if (res?.success) {
        if (navigateLink) {
          navigate(navigateLink);
        }
        return;
      }

      if (res?.retryAfterSeconds) {
        setCountdown(res.retryAfterSeconds);
        setErrorMessage(getLockoutMessage(res.retryAfterSeconds));
      } else if (res?.remainingAttempts !== undefined) {
        setErrorMessage(
          t("auth.login.attemptsRemaining", {
            count: res.remainingAttempts,
          })
        );
      } else if (
        res?.message ===
        "System clock tampering detected! Lockout penalty applied."
      ) {
        setErrorMessage(t("auth.login.systemClockTampered"));
      } else {
        setErrorMessage(t("auth.login.incorrectPassword"));
      }
    } catch {
      setErrorMessage(t("auth.login.unexpectedError"));
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    isLocked,
    isPending,
    errorMessage,
    onSubmit,
    resetForm,
  };
};
