import z from "zod";
import { useTranslation } from "react-i18next";

export const useResetPasswordSchema = () => {
  const { t } = useTranslation();

  const formSchema = z
    .object({
      newPassword: z
        .string()
        .min(
          1,
          t("validation.required", { field: t("settings.fields.newPassword") }),
        )
        .min(
          4,
          t("validation.minLength", {
            field: t("settings.fields.newPassword"),
            min: 4,
          }),
        )
        .max(
          8,
          t("validation.maxLength", {
            field: t("settings.fields.newPassword"),
            max: 8,
          }),
        ),
      confirmPassword: z
        .string()
        .min(
          1,
          t("validation.required", {
            field: t("settings.fields.confirmPassword"),
          }),
        )
        .min(
          4,
          t("validation.minLength", {
            field: t("settings.fields.confirmPassword"),
            min: 4,
          }),
        )
        .max(
          8,
          t("validation.maxLength", {
            field: t("settings.fields.confirmPassword"),
            max: 8,
          }),
        ),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      message: t("validation.passwordNotMatch"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      message: t("validation.passwordNotMatch"),
      path: ["newPassword"],
    });

  return {
    formSchema,
  };
};
