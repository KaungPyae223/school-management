import { Controller } from "react-hook-form";

import { Check, Loader2Icon, ShieldCheck } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import RequiredLabel from "../../../components/form/RequiredLabel";

import { Card, CardContent } from "../../../components/ui/card";
import { useTranslation } from "react-i18next";
import SettingsBackupCodeDialog from "../../settings/components/2fa/SettingsBackupCodeDialog";
import { use2FAEnableForm } from "../../settings/hooks/2fa/use2FAEnableForm";

const Setup2FA = () => {
  const { t } = useTranslation();

  const {
    form,
    onSubmit,
    qrCode,
    secretKey,
    backupCodes,
    backUpDialogOpen,
    setBackUpDialogOpen,
    errorMessage,
    isPending,
    success,
  } = use2FAEnableForm();

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("setup.twoFactor.title")}
        </h2>
      </div>

      {success ? (
        <Card className="shadow-xs mt-6">
          <CardContent className="text-center py-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="size-7" />
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              <Check className="size-3.5" />
              {t("setup.twoFactor.success.chip")}
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {t("setup.twoFactor.success.title")}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              {t("setup.twoFactor.success.description")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="my-auto shadow-xs ">
          <CardContent>
            <form id="setup-2fa-form" onSubmit={form.handleSubmit(onSubmit)}>
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

            <div className="mt-5 flex items-center gap-2">
              <Button
                type="submit"
                form="setup-2fa-form"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    {t("form.loading")}
                  </>
                ) : (
                  t("settings.twoFactor.enable2FA")
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <SettingsBackupCodeDialog
        open={backUpDialogOpen}
        setOpen={setBackUpDialogOpen}
        backupCodes={backupCodes}
        onBack={() => setBackUpDialogOpen(false)}
      />
    </div>
  );
};

export default Setup2FA;
