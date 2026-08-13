import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import FormFooter from "../../../components/form/FormFooter";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import { useChangePassword } from "../hooks/useChangePassword";
import { useNavigate } from "react-router";
import { ChangePasswordSchema } from "../schema/ChangePasswordSchema";
import { useLockForm } from "../../auth/hooks/useLockForm";

const SettingsPasswordChangeForm = () => {
  const { t } = useTranslation();
  const { formSchema } = ChangePasswordSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useChangePassword();

  const { isLocked, setCountdown, getLockoutMessage } =
    useLockForm(setErrorMessage);

  const changePassword = async () => {
    if (isLocked || isPending) return;

    try {
      const data = form.getValues();

      const res = await mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (res?.success) {
        toast.success(t("settings.changePassword.success"));
        form.reset();

        navigate("/settings");
        return;
      }

      if (res?.retryAfterSeconds) {
        setCountdown(res.retryAfterSeconds);
        setErrorMessage(getLockoutMessage(res.retryAfterSeconds));
      } else if (res?.remainingAttempts !== undefined) {
        setErrorMessage(
          t("auth.login.attemptsRemaining", {
            count: res.remainingAttempts,
          }),
        );
      } else if (
        res?.message ===
        "System clock tampering detected! Lockout penalty applied."
      ) {
        setErrorMessage(t("auth.login.systemClockTampered"));
      } else if (res?.message === "Failed to change password.") {
        setErrorMessage(t("settings.changePassword.failed"));
      } else {
        setErrorMessage(t("auth.login.incorrectPassword"));
      }
    } catch (err) {
      setErrorMessage(t("auth.login.unexpectedError"));
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
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
        title={t("settings.changePassword.confirmTitle")}
        description={t("settings.changePassword.confirmDescription")}
      />
    </Card>
  );
};

export default SettingsPasswordChangeForm;
