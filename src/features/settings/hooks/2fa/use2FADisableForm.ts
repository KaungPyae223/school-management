import { useTranslation } from "react-i18next";
import { useTwoFactorSchema } from "../../schema/useTwoFactorSchema";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTwoFactorDisable } from "../api/useTwoFactorDisable";
import { toast } from "sonner";
import { translateError } from "../../../../utils/translate-error";

export const use2FADisableForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useTwoFactorSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const { mutateAsync, isPending } = useTwoFactorDisable();

  const onSubmit = async () => {
    setConfirmDialogOpen(true);
  };

  const disable2FA = async () => {
    const data = form.getValues();
    setErrorMessage("");
    try {
      await mutateAsync(data.token);
      toast.success(t("settings.twoFactor.disableSuccess"));
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
    disable2FA,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
  };
};
