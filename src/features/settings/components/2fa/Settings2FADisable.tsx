import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";

import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { use2FADisableForm } from "../../hooks/2fa/use2FADisableForm";

const Settings2FADisable = () => {
  const { t } = useTranslation();

  const {
    form,
    onSubmit,
    disable2FA,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
  } = use2FADisableForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.twoFactor.disableTitle")} />
      <CardContent>
        <form id="disable-2FA-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Field>
              <p className="text-sm">
                {t("settings.twoFactor.enterCodeInstruction")}
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
        formID="disable-2FA-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={disable2FA}
        isPending={isPending}
        variant="destructive"
        confirmButtonText={t("settings.twoFactor.disableConfirmButton")}
        title={t("settings.twoFactor.disableConfirmTitle")}
        description={t("settings.twoFactor.disableConfirmDesc")}
      />
    </Card>
  );
};

export default Settings2FADisable;
