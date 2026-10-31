import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  DatabaseBackup,
  Upload,
  FileArchive,
  X,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent } from "../../../../components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import ConfirmDialog from "../../../../components/dialog/ConfirmDialog";
import { useBackupImportSchema } from "../../schema/useBackupImportSchema";
import { cn } from "../../../../lib/utils";
import { useImportBackup } from "../../hooks/api/useImportBackup";
import FormError from "../../../../components/form/FormError";
import { translateError } from "../../../../utils/translate-error";

const SettingsDataBackupImport = ({
  removeHeader = false,
}: {
  removeHeader?: boolean;
}) => {
  const { t } = useTranslation();
  const { formSchema } = useBackupImportSchema();

  const [isDragging, setIsDragging] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      backup: undefined as unknown as File,
    },
  });

  const { mutateAsync, isPending } = useImportBackup();

  const validateFile = (file: File): boolean => {
    const isZip =
      file.name.toLowerCase().endsWith(".zip") ||
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed" ||
      file.type === "multipart/x-zip";

    if (!isZip) {
      toast.error(t("settings.backup.invalidZip"));
      return false;
    }
    return true;
  };

  const handleFileChange = (
    files: FileList | null,
    onChange: (file: File | undefined) => void,
  ) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (validateFile(file)) {
      onChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    onChange: (file: File | undefined) => void,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files, onChange);
    }
  };

  const handleRemoveFile = (onChange: (file: undefined) => void) => {
    onChange(undefined);
  };

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const handleImportBackup = async () => {
    const values = form.getValues();
    setErrorMessage("");

    try {
      const filePath = await window.backupAPI.getFilePath(values.backup);

      await mutateAsync({
        filePath,
        password: values.password,
      });

      toast.success(t("settings.backup.importSuccess"));
      form.reset();
      await window.backupAPI.relaunchApp();
    } catch (error: any) {
      const msg = translateError(error, t) || t("settings.backup.importFailed");
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <Card>
      <form id="backup-import" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <CardContent className="space-y-4">
            <FormError errorMessage={errorMessage} />
            {!removeHeader && (
              <Alert className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <DatabaseBackup className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <AlertTitle>{t("settings.backup.importTitle")}</AlertTitle>
                  <AlertDescription>
                    {t("settings.backup.importDesc")}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <Alert>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="password">
                      {t("settings.backup.backupPassword")}
                    </RequiredLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder={t(
                        "settings.backup.backupPasswordPlaceholder",
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

            <Controller
              name="backup"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  {field.value ? (
                    <div className="space-y-3">
                      <Alert className="flex items-center gap-3 border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400">
                          <FileArchive className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <AlertTitle className="truncate font-medium">
                            {(field.value as File).name}
                          </AlertTitle>
                          <AlertDescription className="text-xs text-emerald-700/80 dark:text-emerald-300/80">
                            {(
                              (field.value as File).size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </AlertDescription>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={t("settings.backup.removeFile")}
                          className="size-8 shrink-0 text-emerald-700 hover:bg-emerald-200/60 hover:text-destructive dark:text-emerald-400 dark:hover:bg-emerald-900/60 dark:hover:text-destructive"
                          onClick={() => handleRemoveFile(field.onChange)}
                        >
                          <X className="size-4" />
                        </Button>
                      </Alert>

                      <Alert variant="destructive">
                        <AlertCircle className="size-4" />
                        <AlertTitle>
                          {t("settings.backup.overwriteWarningTitle")}
                        </AlertTitle>
                        <AlertDescription>
                          {t("settings.backup.overwriteWarningDesc")}
                        </AlertDescription>
                      </Alert>

                      <Button
                        className="w-full gap-2"
                        variant="default"
                        type="submit"
                        disabled={isPending}
                      >
                        <DatabaseBackup className="size-4" />
                        {isPending
                          ? t("settings.backup.restoring")
                          : t("settings.backup.restoreButton")}
                      </Button>
                    </div>
                  ) : (
                    <FieldLabel htmlFor="backup-file-input">
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, field.onChange)}
                        className={cn(
                          "border-2  border-dashed rounded-xl p-6 text-center w-full transition-all cursor-pointer",
                          isDragging
                            ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/50"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50",
                        )}
                      >
                        <Upload
                          className={cn(
                            "h-8 w-8 my-6 mx-auto transition-colors duration-200",
                            isDragging ? "text-indigo-500" : "text-gray-400",
                          )}
                        />
                        <p className="text-sm text-gray-600 my-2">
                          {t("settings.backup.dropzoneText")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("settings.backup.dropzoneSubtext")}
                        </p>
                      </div>
                    </FieldLabel>
                  )}
                  <Input
                    id="backup-file-input"
                    type="file"
                    accept=".zip,application/zip,application/x-zip-compressed"
                    onChange={(e) =>
                      handleFileChange(e.target.files, field.onChange)
                    }
                    className="hidden"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
        </FieldGroup>
      </form>

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={handleImportBackup}
        isPending={isPending}
        confirmButtonText={t("settings.backup.importConfirmButton")}
        title={t("settings.backup.importConfirmTitle")}
        description={t("settings.backup.importConfirmDesc")}
      />
    </Card>
  );
};

export default SettingsDataBackupImport;
