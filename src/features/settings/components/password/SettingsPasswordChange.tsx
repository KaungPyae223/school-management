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
import { useChangePasswordForm } from "../../hooks/password/useChangePasswordForm";

const SettingsPasswordChange = () => {
  const { t } = useTranslation();
  const {
    form,
    onSubmit,
    changePassword,
    confirmDialogOpen,
    setConfirmDialogOpen,
    errorMessage,
    resetForm,
    isLocked,
    isPending,
  } = useChangePasswordForm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.changePassword.title")} />
      <CardContent>
        <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              name="oldPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="oldPassword">
                    {t("settings.fields.oldPassword")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="oldPassword"
                    type="password"
                    disabled={isLocked || isPending}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("settings.fields.oldPasswordPlaceholder")}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                    disabled={isLocked || isPending}
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
                    aria-invalid={fieldState.invalid}
                    disabled={isLocked || isPending}
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
        disabled={isLocked}
        formID="change-password-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={changePassword}
        isPending={isPending}
        confirmButtonText={t("settings.changePassword.confirmButton")}
        title={t("settings.changePassword.confirmTitle")}
        description={t("settings.changePassword.confirmDescription")}
      />
    </Card>
  );
};

export default SettingsPasswordChange;
