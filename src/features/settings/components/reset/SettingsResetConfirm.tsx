import { Controller } from "react-hook-form";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useResetConfirm } from "../../hooks/reset/useResetConfirm";
import { useLoaderData } from "react-router";

const SettingsRestConfirm = () => {
  const { t } = useTranslation();

  const { hasPassword } = useLoaderData();

  const confirmPhrase = t("settings.reset.confirmPhrase");

  const {
    confirmText,
    setConfirmText,
    form,
    onSubmit,
    resetData,
    resetForm,
    confirmDialogOpen,
    errorMessage,
    isPending,
    setConfirmDialogOpen,
  } = useResetConfirm();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-xs">
      <FormHeader title={t("settings.reset.title")} />
      <CardContent>
        <form id="create-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>{t("settings.reset.warningTitle")}</AlertTitle>
              <AlertDescription>
                {t("settings.reset.warningDesc")}
              </AlertDescription>
            </Alert>
            {hasPassword && (
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
            )}

            <Field>
              <FieldLabel id="confirm">
                {t("settings.reset.confirmLabel", { phrase: confirmPhrase })}
              </FieldLabel>
              <Input
                id="confirm"
                onChange={(e) => setConfirmText(e.target.value)}
                type="text"
                placeholder={confirmPhrase}
                autoComplete="off"
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        formID="create-password-form"
        isSubmitting={isPending}
        resetForm={resetForm}
        disabled={confirmText !== confirmPhrase}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={resetData}
        isPending={isPending}
        variant={"destructive"}
        title={t("settings.reset.dialogTitle")}
        description={t("settings.reset.dialogDesc")}
        confirmButtonText={t("settings.reset.dialogButton")}
      />
    </Card>
  );
};

export default SettingsRestConfirm;
