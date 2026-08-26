import z from "zod";
import { useTranslation } from "react-i18next";

export const ClassesSchema = () => {
  const { t } = useTranslation();

  const formSchema = z
    .object({
      teacherId: z
        .number()
        .min(
          1,
          t("validation.required", { field: t("classes.fields.teacher") }),
        ),
      courseId: z
        .number()
        .min(
          1,
          t("validation.required", { field: t("classes.fields.course") }),
        ),
      startDate: z
        .date({
          message: t("validation.required", {
            field: t("classes.fields.startDate"),
          }),
        })
        .refine((date) => date >= new Date(), {
          message: t("validation.startDateFuture"),
        }),
      startTime: z.date({
        message: t("validation.required", {
          field: t("classes.fields.startTime"),
        }),
      }),
      endTime: z.date({
        message: t("validation.required", {
          field: t("classes.fields.endTime"),
        }),
      }),
      days: z
        .string()
        .min(1, t("validation.required", { field: t("classes.fields.days") })),
      description: z.string().optional(),
      price: z
        .number()
        .min(1, t("validation.required", { field: t("classes.fields.price") })),
    })
    .refine((data) => data.startTime < data.endTime, {
      message: t("validation.timeOrder"),
      path: ["endTime"],
    })
    .refine((data) => data.startTime < data.endTime, {
      message: t("validation.timeOrderStart"),
      path: ["startTime"],
    });

  return {
    formSchema,
  };
};
