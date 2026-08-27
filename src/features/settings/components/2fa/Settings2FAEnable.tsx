import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";

import { useTwoFactorSchema } from "../../schema/useTwoFactorSchema";
import { authService } from "../../../../services/auth";
import { useTwoFactorEnable } from "../../hooks/api/useTwoFactorEnable";
import SettingsBackupCodeDialog from "./SettingsBackupCodeDialog";
import { translateError } from "../../../../utils/translate-error";

const Settings2FAEnable = () => {
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

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={t("settings.twoFactor.enableTitle")} />
      <CardContent>
        <form id="enable-2FA-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <p className="text-sm">
                {t("settings.twoFactor.scanInstruction")}
              </p>
              <img
                src={qrCode}
                alt="TOTP QR Code"
                className="max-w-64 h-64 mx-auto"
              />
              <p className="text-xs text-gray-500 font-mono text-center">
                {t("settings.twoFactor.manualKey", { key: secretKey })}
              </p>
            </Field>
            <Controller
              name="token"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="token">
                    {t("settings.fields.token")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="token"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("settings.fields.tokenPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        formID="enable-2FA-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
      <SettingsBackupCodeDialog
        open={backUpDialogOpen}
        setOpen={setBackUpDialogOpen}
        backupCodes={backupCodes}
      />
    </Card>
  );
};

export default Settings2FAEnable;
