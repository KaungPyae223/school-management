import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";
import { use2FAVerifyForm } from "../../hooks/2fa/use2FAVerifyForm";

const Settings2FAVerify = () => {
  const { t } = useTranslation();

  const { form, onSubmit, resetForm, errorMessage, isPending } =
    use2FAVerifyForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.twoFactor.verifyTitle")} />
      <CardContent>
        <form id="verify-2FA-form" onSubmit={form.handleSubmit(onSubmit)}>
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
        formID="verify-2FA-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />
    </Card>
  );
};

export default Settings2FAVerify;
