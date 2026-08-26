import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, m } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  Filter,
  LibraryBig,
  RotateCcw,
  Search,
  UserPen,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

import ClassesAdvancedQueryGroup from "./ClassesAdvancedQueryGroup";
import { useClassesAdvancedQuerySchema } from "../schema/useClassesAdvancedQuerySchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import DateInput from "../../../components/form/DateInput";
import { Label } from "../../../components/ui/label";
import TimeInput from "../../../components/form/TimeInput";
import NumberInput from "../../../components/form/NumberInput";
import ClassesAdvancedQueryTeacherSelect from "./ClassesAdvancedQueryTeacherSelect";
import ClassesAdvancedQueryCourseSelect from "./ClassesAdvancedQueryCourseSelect";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useSetQueryParams } from "../../../hooks/use-set-query-params";
import { useEffect } from "react";

const ClassesAdvancedQuery = () => {
  const { t } = useTranslation();

  const { formSchema } = useClassesAdvancedQuerySchema();

  type FormInput = z.input<typeof formSchema>;
  type FormOutput = z.output<typeof formSchema>;

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseIds: "",
      teacherIds: "",
      startTime: undefined,
      endTime: undefined,
      startDate: undefined,
      endDate: undefined,
      minPrice: "" as unknown as number,
      maxPrice: "" as unknown as number,
    },
  });

  const [searchParams] = useSearchParams();

  const { activeQueryParams } = useGetQueryParams();
  const updateQueryParams = useSetQueryParams();

  const isAdvancedQuery = searchParams.get("advancedQuery");

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
    form.reset();
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
    selectedTeachers !== "" ||
    selectedCourses.length > 0 ||
    startDate !== undefined ||
    endDate !== undefined ||
    startTime !== undefined ||
    endTime !== undefined ||
    minPrice !== ("" as unknown as number) ||
    maxPrice !== ("" as unknown as number);

  const onSubmit = (data: FormOutput) => {
    updateQueryParams({
      ...data,
      startTime: data.startTime?.toISOString(),
      endTime: data.endTime?.toISOString(),
      startDate: data.startDate?.toISOString(),
      endDate: data.endDate?.toISOString(),
    });
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isAdvancedQuery && (
        <m.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{
            duration: 0.2,
          }}
          className="overflow-hidden p-0.5"
        >
          <form id="query-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Card className="shadow-sm">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ClassesAdvancedQueryGroup
                      icon={<UserPen className="size-3.5 text-primary" />}
                      title={t("classes.fields.teacher")}
                      isSelected={!!selectedTeachers}
                    >
                      <Controller
                        name="teacherIds"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <ClassesAdvancedQueryTeacherSelect
                            field={field}
                            fieldState={fieldState}
                          />
                        )}
                      />
                    </ClassesAdvancedQueryGroup>

                    <ClassesAdvancedQueryGroup
                      icon={<LibraryBig className="size-3.5 text-primary" />}
                      title={t("classes.fields.course")}
                      isSelected={!!selectedCourses}
                    >
                      <Controller
                        name="courseIds"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <ClassesAdvancedQueryCourseSelect
                            field={field}
                            fieldState={fieldState}
                          />
                        )}
                      />
                    </ClassesAdvancedQueryGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ClassesAdvancedQueryGroup
                      icon={<CalendarIcon className="size-3.5 text-primary" />}
                      title={`${t("classes.fields.startDate")} & ${t("classes.fields.endDate")}`}
                      isSelected={!!(startDate || endDate)}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Controller
                          name="startDate"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                {t("classes.fields.startDate")}
                              </Label>

                              <DateInput
                                field={field}
                                label={t("classes.fields.startDate")}
                                ariaInvalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="endDate"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                {t("classes.fields.endDate")}
                              </Label>

                              <DateInput
                                field={field}
                                label={t("classes.fields.endDate")}
                                ariaInvalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </ClassesAdvancedQueryGroup>
                    <ClassesAdvancedQueryGroup
                      icon={<Clock className="size-3.5 text-primary" />}
                      title={`${t("classes.fields.time")} Range`}
                      isSelected={!!(startTime || endTime)}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Controller
                          name="startTime"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                {t("classes.fields.startDate")}
                              </Label>

                              <TimeInput
                                field={field}
                                fieldState={fieldState}
                                id="startTime"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="endTime"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                {t("classes.fields.endDate")}
                              </Label>

                              <TimeInput
                                field={field}
                                fieldState={fieldState}
                                id="endTime"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </ClassesAdvancedQueryGroup>

                    <ClassesAdvancedQueryGroup
                      icon={<DollarSign className="size-3.5 text-primary" />}
                      title={`${t("classes.fields.price")} Range`}
                      isSelected={!!(minPrice || maxPrice)}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Controller
                          name="minPrice"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                Min Price
                              </Label>

                              <NumberInput
                                field={field}
                                fieldState={fieldState}
                                id="minPrice"
                                placeholder={"Min"}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="maxPrice"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="gap-0.5"
                            >
                              <Label className="text-muted-foreground text-xs">
                                Max Price
                              </Label>

                              <NumberInput
                                field={field}
                                fieldState={fieldState}
                                id="maxPrice"
                                placeholder={"Max"}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </ClassesAdvancedQueryGroup>
                  </div>

                  <ClassesAdvancedQueryGroup
                    icon={<Filter className="size-3.5 text-primary" />}
                    title="Query Actions"
                    className="flex flex-row items-center justify-between space-y-0"
                  >
                    <div className="space-x-3 flex items-center">
                      {hasActiveFilters && (
                        <Badge
                          variant="secondary"
                          className="px-2 py-0 text-muted-foreground"
                        >
                          Selected
                        </Badge>
                      )}

                      <Button
                        variant="outline"
                        onClick={handleCancelAll}
                        disabled={!hasActiveFilters}
                        type="button"
                      >
                        <RotateCcw className="size-3.5" />
                        Cancel All
                      </Button>
                      <Button variant="default" type="submit">
                        <Search className="size-3.5" />
                        Apply Filters
                      </Button>
                    </div>
                  </ClassesAdvancedQueryGroup>
                </CardContent>
              </Card>
            </FieldGroup>
          </form>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ClassesAdvancedQuery;
