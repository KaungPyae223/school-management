import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import FormHeader from "../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import FormFooter from "../../../components/form/FormFooter";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { useLockForm } from "../hooks/useLockForm";
import { PasswordSchema } from "../schema/PasswordSchema";

const AuthLoginForm = ({ navigateLink }: { navigateLink?: string }) => {
  const { t } = useTranslation();
  const { formSchema } = PasswordSchema();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { mutateAsync, isPending } = useLogin();

  const { isLocked, setCountdown, getLockoutMessage } =
    useLockForm(setErrorMessage);

  const onSubmit = async (values: FormValues) => {
    if (isLocked || isPending) return;

    try {
      const res = await mutateAsync(values.password);

      if (res?.success) {
        if (navigateLink) {
          navigate(navigateLink);
        }
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
                  <RequiredLabel id="password">
                    {t("auth.fields.password")}
                  </RequiredLabel>
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
