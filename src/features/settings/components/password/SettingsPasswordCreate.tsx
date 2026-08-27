import { useState } from "react";
import { useCreatePasswordSchema } from "../schema/useCreatePasswordSchema";
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
import { useCreatePassword } from "../hooks/useCreatePassword";
import { useNavigate } from "react-router";
import { translateError } from "../../../utils/translate-error";

const SettingsPasswordCreate = ({
  navigateLink,
  back = true,
}: {
  navigateLink?: string;
  back?: boolean;
}) => {
  const { t } = useTranslation();
  const { formSchema } = useCreatePasswordSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useCreatePassword();

  const createPassword = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data.password);

      toast.success(t("settings.createPassword.success"));
      form.reset();
      navigate(navigateLink);
    } catch (error: any) {
      const msg = translateError(error, t);
      toast.error(msg);
      setErrorMessage(msg);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
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
