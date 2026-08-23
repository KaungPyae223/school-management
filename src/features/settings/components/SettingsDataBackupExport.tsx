import { Download, FileArchive } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useState } from "react";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import { Controller, useForm } from "react-hook-form";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { Input } from "../../../components/ui/input";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { PasswordSchema } from "../../auth/schema/PasswordSchema";
import { useExportBackup } from "../hooks/useExportBackup";
import { toast } from "sonner";
import FormError from "../../../components/form/FormError";

const SettingsDataBackupExport = () => {
  const { t } = useTranslation();
  const { formSchema } = PasswordSchema();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useExportBackup();

  const exportBackup = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data.password);

      toast.success(t("settings.backup.exportSuccess"));
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <Card>
      <form id="backup-export" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <CardContent className="space-y-3">
            <FormError errorMessage={errorMessage} />

            <Alert className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileArchive className="size-5 text-muted-foreground" />
              </div>
              <div>
                <AlertTitle>{t("settings.backup.exportTitle")}</AlertTitle>
                <AlertDescription>
                  {t("settings.backup.exportDesc")}
                </AlertDescription>
              </div>
            </Alert>

            <Alert>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="password">
                      {t("settings.backup.currentPassword")}
                    </RequiredLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder={t(
                        "settings.backup.currentPasswordPlaceholder",
                      )}
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Alert>

            <Button className="w-full" type="submit">
              <Download />
              {t("settings.backup.exportButton")}
            </Button>
          </CardContent>
        </FieldGroup>
      </form>
      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={exportBackup}
        isPending={isPending}
        confirmButtonText={t("settings.backup.exportConfirmButton")}
        title={t("settings.backup.exportConfirmTitle")}
        description={t("settings.backup.exportConfirmDesc")}
      />
    </Card>
  );
};

export default SettingsDataBackupExport;
