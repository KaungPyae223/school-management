import { useState } from "react";
import { useCreatePasswordSchema } from "../../settings/schema/useCreatePasswordSchema";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePassword } from "../../settings/hooks/api/useCreatePassword";
import { toast } from "sonner";
import { translateError } from "../../../utils/translate-error";
import { useTranslation } from "react-i18next";

export const useSetupPasswordCreateForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useCreatePasswordSchema();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [complete, setComplete] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useCreatePassword();

  const onSubmit = () => {
    setErrorMessage("");
    setConfirmDialogOpen(true);
  };

  const createPassword = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      await mutateAsync(data.password);
      toast.success(t("settings.createPassword.success"));
      setComplete(true);
      form.reset();
    } catch (error: any) {
      const msg = translateError(error, t);
      toast.error(msg);
      setErrorMessage(msg);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return {
    form,
    onSubmit,
    createPassword,
    confirmDialogOpen,
    errorMessage,
    complete,
    isPending,
    setConfirmDialogOpen,
  };
};
