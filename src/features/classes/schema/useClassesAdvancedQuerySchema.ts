import z from "zod";
import { useTranslation } from "react-i18next";

export const useClassesAdvancedQuerySchema = () => {
  const { t } = useTranslation();

  const formSchema = z
    .object({
      courseIds: z.string().optional(),
      teacherIds: z.string().optional(),
      startTime: z.date().optional(),
      endTime: z.date().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      minPrice: z.coerce.number().optional(),
      maxPrice: z.coerce.number().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startTime && data.endTime) {
        if (data.startTime >= data.endTime) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.timeOrder"),
            path: ["endTime"],
          });
          ctx.addIssue({
            code: "custom",
            message: t("validation.timeOrderStart"),
            path: ["startTime"],
          });
        }
      }
      if (data.startDate && data.endDate) {
        if (data.startDate >= data.endDate) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.dateOrder"),
            path: ["endDate"],
          });
          ctx.addIssue({
            code: "custom",
            message: t("validation.dateOrderStart"),
            path: ["startDate"],
          });
        }
      }
      if (data.minPrice && data.maxPrice) {
        if (data.minPrice >= data.maxPrice) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.priceOrder"),
            path: ["maxPrice"],
          });
          ctx.addIssue({
            code: "custom",
            message: t("validation.priceOrderStart"),
            path: ["minPrice"],
          });
        }
      }
    });

  return {
    formSchema,
  };
};
