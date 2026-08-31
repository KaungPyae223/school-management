import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import FormHeader from "../../../../components/form/FormHeader";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import FormError from "../../../../components/form/FormError";
import FormFooter from "../../../../components/form/FormFooter";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { Input } from "../../../../components/ui/input";

import { useTwoFactorSchema } from "../../schema/useTwoFactorSchema";
import { useTwoFactorDisable } from "../../hooks/api/useTwoFactorDisable";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useNavigate } from "react-router";
import { translateError } from "../../../../utils/translate-error";

const Settings2FADisable = () => {
  const { t } = useTranslation();
  const { formSchema } = useTwoFactorSchema();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const { mutateAsync, isPending } = useTwoFactorDisable();

  const onSubmit = async () => {
    setConfirmDialogOpen(true);
  };

  const disable2FA = async () => {
    const data = form.getValues();
    setErrorMessage("");
    try {
      await mutateAsync(data.token);
      toast.success(t("settings.twoFactor.disableSuccess"));
      form.reset();
      navigate(-1);
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
