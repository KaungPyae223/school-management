import { z } from "zod";
import { useTranslation } from "react-i18next";

const ZIP_MIME_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
];

export const useBackupImportSchema = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    password: z
      .string()
      .min(1, t("validation.required", { field: t("auth.fields.password") }))
      .min(
        4,
        t("validation.minLength", {
          field: t("auth.fields.password"),
          min: 4,
        }),
      )
      .max(
        8,
        t("validation.maxLength", {
          field: t("auth.fields.password"),
          max: 8,
        }),
      ),
    backup: z
      .custom<File>((val) => val instanceof File, {
        message: t("validation.required", {
          field: t("settings.backup.file", "Backup File"),
        }),
      })
      .refine(
        (file) =>
          ZIP_MIME_TYPES.includes(file.type) ||
          file.name.toLowerCase().endsWith(".zip"),
        {
          message: t(
            "validation.zipOnly",
            "Only .zip archive files are supported",
          ),
        },
      ),
  });

  return {
    formSchema,
  };
};
