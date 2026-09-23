import { Controller } from "react-hook-form";

import { Check, Loader2Icon, ShieldCheck } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import FormError from "../../../components/form/FormError";
import RequiredLabel from "../../../components/form/RequiredLabel";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";

import { Card, CardContent } from "../../../components/ui/card";
import { useTranslation } from "react-i18next";
import { useSetupPasswordCreateForm } from "../hooks/useSetupPasswordCreateForm";

const SetupPassword = () => {
  const { t } = useTranslation();

  const {
    form,
    onSubmit,
    createPassword,
    confirmDialogOpen,
    errorMessage,
    complete,
    isPending,
    setConfirmDialogOpen,
  } = useSetupPasswordCreateForm();

  return (
    <div className="flex h-full flex-col">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("setup.password.title")}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {t("setup.password.description")}
        </p>
      </div>

      {complete ? (
        <Card className="my-auto shadow-xs ">
          <CardContent className="text-center py-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="size-7" />
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              <Check className="size-3.5" />
              {t("setup.password.success.chip")}
            </div>

            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {t("setup.password.success.title")}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              {t("setup.password.success.description")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="my-auto shadow-xs ">
          <CardContent>
            <form
              id="setup-password-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

            <div className="mt-5 flex items-center gap-2">
              <Button
                type="submit"
                form="setup-password-form"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    {t("setup.password.saving")}
                  </>
                ) : (
                  t("setup.password.submit")
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createPassword}
        isPending={isPending}
        confirmButtonText={t("settings.createPassword.confirmButton")}
        title={t("settings.createPassword.confirmTitle")}
        description={t("settings.createPassword.confirmDescription")}
      />
    </div>
  );
};

export default SetupPassword;
