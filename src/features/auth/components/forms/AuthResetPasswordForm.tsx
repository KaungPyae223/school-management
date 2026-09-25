import { Controller } from "react-hook-form";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";
import { useResetPasswordForm } from "../../hooks/forms/useAuthResetPasswordForm";

const AuthResetPasswordForm = ({ resetCount }: { resetCount: number }) => {
  const { t } = useTranslation();
  const {
    form,
    onSubmit,
    resetPassword,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    resetForm,
    isPending,
  } = useResetPasswordForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("auth.resetPassword.title")} />
      <CardContent>
        <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="newPassword">
                    {t("settings.fields.newPassword")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("settings.fields.newPasswordPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="confirmPassword">
                    {t("settings.fields.confirmPassword")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder={t(
                      "settings.fields.confirmPasswordPlaceholder",
                    )}
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
        formID="change-password-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={resetPassword}
        isPending={isPending}
        title={t("auth.resetPassword.confirmTitle")}
        description={t("auth.resetPassword.confirmDescription", {
          count: resetCount,
        })}
        confirmButtonText={t("auth.resetPassword.confirmButton")}
      />
    </Card>
  );
};

export default AuthResetPasswordForm;
