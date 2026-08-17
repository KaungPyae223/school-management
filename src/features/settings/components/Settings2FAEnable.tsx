import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import {
  Field,
  FieldError,
  FieldGroup,
} from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import FormFooter from "../../../components/form/FormFooter";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";

import { TwoFactorSchema } from "../schema/TwoFactorSchema";
import { authService } from "../../../services/auth";
import { useTwoFactorEnable } from "../hooks/useTwoFactorEnable";
import SettingsBackupCodeDialog from "./SettingsBackupCodeDialog";

const Settings2FAEnable = () => {
  const { t } = useTranslation();
  const { formSchema } = TwoFactorSchema();
  const [backUpDialogOpen, setBackUpDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const startSetup = async () => {
    const res = await authService.generate2FA();
    if (res.success) {
      setQrCode(res.qrCodeUrl);
      setSecretKey(res.secret);
      setBackupCodes(res.backupCodes);
    }
  };

  useEffect(() => {
    startSetup();
  }, []);

  const { mutateAsync, isPending } = useTwoFactorEnable();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setErrorMessage("");
    try {
      await mutateAsync({
        token: data.token,
        backupCodes,
      });
      toast.success("Two-Factor Authentication enabled successfully");
      form.reset();
      setBackUpDialogOpen(true);
    } catch (error: any) {
      toast.error(error.message);
      setErrorMessage(error.message);
    }
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={"Enable Two-Factor Authentication"} />
      <CardContent>
        <form id="create-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <p className="text-sm">
                Scan this QR code with <b>Google Authenticator</b>,{" "}
                <b>Microsoft Authenticator</b>, or <b>Authy</b>:
              </p>
              <img
                src={qrCode}
                alt="TOTP QR Code"
                className="max-w-64 h-64 mx-auto"
              />
              <p className="text-xs text-gray-500 font-mono text-center">
                Manual key: {secretKey}
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
                    placeholder={t("settings.fields.token")}
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
        formID="create-password-form"
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
