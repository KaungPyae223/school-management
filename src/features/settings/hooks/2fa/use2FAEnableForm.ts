import { useTranslation } from "react-i18next";
import { useTwoFactorSchema } from "../../schema/useTwoFactorSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTwoFactorEnable } from "../api/useTwoFactorEnable";
import { authService } from "../../../../services/auth";
import { toast } from "sonner";
import { translateError } from "../../../../utils/translate-error";

export const use2FAEnableForm = () => {
  const { t } = useTranslation();
  const { formSchema } = useTwoFactorSchema();
  const [backUpDialogOpen, setBackUpDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [qrCode, setQrCode] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetch2FA = async () => {
      const res = await authService.generate2FA();

      setQrCode(res.qrCodeUrl);
      setSecretKey(res.secret);
      setBackupCodes(res.backupCodes);
    };

    fetch2FA();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const { mutateAsync, isPending } = useTwoFactorEnable();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setErrorMessage("");
    try {
      await mutateAsync({
        token: data.token,
        backupCodes,
      });
      toast.success(t("settings.twoFactor.enableSuccess"));
      form.reset();
      setBackUpDialogOpen(true);
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
    qrCode,
    secretKey,
    backupCodes,
    backUpDialogOpen,
    errorMessage,
    isPending,
    setBackUpDialogOpen,
  };
};
