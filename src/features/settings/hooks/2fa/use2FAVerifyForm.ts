import { useTranslation } from "react-i18next";
import { useTwoFactorSchema } from "../../schema/useTwoFactorSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTwoFactorVerifiy } from "../api/useTwoFactorVerifiy";
import { useRevalidator } from "react-router";
import { toast } from "sonner";
import { translateError } from "../../../../utils/translate-error";

export const use2FAVerifyForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useTwoFactorSchema();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const revalidator = useRevalidator();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const { mutateAsync, isPending } = useTwoFactorVerifiy();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setErrorMessage("");
    try {
      await mutateAsync(data.token);
      toast.success(t("settings.twoFactor.verifySuccess"));
      form.reset();
      revalidator.revalidate();
    } catch (error: any) {
      const msg = translateError(error, t);
      toast.error(msg);
      setErrorMessage(msg);
    }
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  return {
    form,
    onSubmit,
    resetForm,
    errorMessage,
    isPending,
  };
};
