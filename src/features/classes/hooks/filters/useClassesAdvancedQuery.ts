import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useClassesAdvancedQuerySchema } from "../../schema/useClassesAdvancedQuerySchema";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";

export const useClassesAdvancedQuery = () => {
  const { formSchema } = useClassesAdvancedQuerySchema();

  type FormInput = z.input<typeof formSchema>;
  type FormOutput = z.output<typeof formSchema>;

  const defaultValues: FormInput = {
    courseIds: "",
    teacherIds: "",
    startTime: undefined,
    endTime: undefined,
    startDate: undefined,
    endDate: undefined,
    minPrice: "" as unknown as number,
    maxPrice: "" as unknown as number,
  };

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [searchParams] = useSearchParams();
  const { activeQueryParams } = useGetQueryParams();
  const updateQueryParams = useSetQueryParams();

  const isAdvancedQuery = Boolean(searchParams.get("advancedQuery"));

  const selectedCourses = form.watch("courseIds");
  const selectedTeachers = form.watch("teacherIds");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const minPrice = form.watch("minPrice");
  const maxPrice = form.watch("maxPrice");

  useEffect(() => {
    form.reset({
      ...activeQueryParams,
      startTime: activeQueryParams.startTime
        ? new Date(activeQueryParams.startTime)
        : undefined,
      endTime: activeQueryParams.endTime
        ? new Date(activeQueryParams.endTime)
        : undefined,
      startDate: activeQueryParams.startDate
        ? new Date(activeQueryParams.startDate)
        : undefined,
      endDate: activeQueryParams.endDate
        ? new Date(activeQueryParams.endDate)
        : undefined,
      minPrice: activeQueryParams.minPrice as unknown as number,
      maxPrice: activeQueryParams.maxPrice as unknown as number,
    });
  }, []);

  const handleCancelAll = () => {
    form.reset(defaultValues);
    updateQueryParams({
      courseIds: "",
      teacherIds: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const hasActiveFilters =
    Boolean(selectedTeachers?.length) ||
    Boolean(selectedCourses?.length) ||
    startDate !== undefined ||
    endDate !== undefined ||
    startTime !== undefined ||
    endTime !== undefined ||
    minPrice !== "" ||
    maxPrice !== "";

  const onSubmit = (data: FormOutput) => {
    updateQueryParams({
      ...data,
      startTime: data.startTime?.toISOString(),
      endTime: data.endTime?.toISOString(),
      startDate: data.startDate?.toISOString(),
      endDate: data.endDate?.toISOString(),
    });
  };

  return {
    form,
    isAdvancedQuery,
    selectedCourses,
    selectedTeachers,
    startDate,
    endDate,
    startTime,
    endTime,
    minPrice,
    maxPrice,
    hasActiveFilters,
    handleCancelAll,
    onSubmit,
  };
};
