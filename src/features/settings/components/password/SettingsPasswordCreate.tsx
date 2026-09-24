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
import { useCreatePasswordForm } from "../../hooks/password/useCreatePasswordForm";

const SettingsPasswordCreate = ({
  navigateLink,
  back = true,
}: {
  navigateLink?: string;
  back?: boolean;
}) => {
  const { t } = useTranslation();

  const {
    form,
    onSubmit,
    createPassword,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
  } = useCreatePasswordForm(navigateLink);

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.createPassword.title")} back={back} />
      <CardContent>
        <form id="create-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="password">
                    {t("settings.fields.password")}
                  </RequiredLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("settings.fields.passwordPlaceholder")}
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
        formID="create-password-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createPassword}
        isPending={isPending}
        confirmButtonText={t("settings.createPassword.confirmButton")}
        title={t("settings.createPassword.confirmTitle")}
        description={t("settings.createPassword.confirmDescription")}
      />
    </Card>
  );
};

export default SettingsPasswordCreate;
