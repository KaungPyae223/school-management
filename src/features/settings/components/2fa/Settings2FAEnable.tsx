import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";

import SettingsBackupCodeDialog from "./SettingsBackupCodeDialog";
import { use2FAEnableForm } from "../../hooks/2fa/use2FAEnableForm";

const Settings2FAEnable = () => {
  const { t } = useTranslation();

  const {
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
  } = use2FAEnableForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.twoFactor.enableTitle")} />
      <CardContent>
        <form id="enable-2FA-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <p className="text-sm">
                {t("settings.twoFactor.scanInstruction")}
              </p>
              {qrCode && (
                <img
                  src={qrCode}
                  alt="TOTP QR Code"
                  className="max-w-64 h-64 mx-auto"
                />
              )}

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
