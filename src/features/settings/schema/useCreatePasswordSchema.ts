import z from "zod";
import { useTranslation } from "react-i18next";

export const useCreatePasswordSchema = () => {
  const { t } = useTranslation();

  const formSchema = z
    .object({
      password: z
        .string()
        .min(
          1,
          t("validation.required", { field: t("settings.fields.password") }),
        )
        .min(
          4,
          t("validation.minLength", {
            field: t("settings.fields.password"),
            min: 4,
          }),
        )
        .max(
          8,
          t("validation.maxLength", {
            field: t("settings.fields.password"),
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
    .refine((data) => data.confirmPassword === data.password, {
      message: t("validation.passwordNotMatch"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: t("validation.passwordNotMatch"),
      path: ["password"],
    });

  return {
    formSchema,
  };
};
