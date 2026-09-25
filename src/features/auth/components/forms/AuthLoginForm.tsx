import { Controller } from "react-hook-form";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../components/ui/input";
import { useAuthLoginForm } from "../../hooks/forms/useAuthLoginForm";
import { Label } from "../../../../components/ui/label";

interface AuthLoginFormProps {
  navigateLink?: string;
}

const AuthLoginForm = ({ navigateLink }: AuthLoginFormProps) => {
  const { t } = useTranslation();
  const {
    form,
    isLocked,
    isPending,
    errorMessage,
    onSubmit,
    resetForm,
    is2FAEnabled,
    navigate,
    resetCount,
  } = useAuthLoginForm(navigateLink);

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("auth.login.title")} back={false} />
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {t("auth.fields.password")}
                    </Label>
                    {is2FAEnabled && resetCount > 0 && (
                      <p
                        onClick={() => navigate("/forget-password")}
                        className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {t("auth.forgotPassword")}
                      </p>
                    )}
                  </div>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    disabled={isLocked || isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("auth.fields.passwordPlaceholder")}
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
        formID="login-form"
        disabled={isLocked}
        isSubmitting={isPending}
        resetForm={resetForm}
      />
    </Card>
  );
};

export default AuthLoginForm;
