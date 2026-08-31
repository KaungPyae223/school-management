import { useTranslation } from "react-i18next";
import { AnimatePresence, m } from "framer-motion";
import { Controller } from "react-hook-form";
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

import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Field, FieldError, FieldGroup } from "../../../../components/ui/field";
import { Label } from "../../../../components/ui/label";
import DateInput from "../../../../components/form/DateInput";
import TimeInput from "../../../../components/form/TimeInput";
import NumberInput from "../../../../components/form/NumberInput";

import ClassesAdvancedQueryGroup from "./ClassesAdvancedQueryGroup";
import ClassesAdvancedQueryTeacherSelect from "./ClassesAdvancedQueryTeacherSelect";
import ClassesAdvancedQueryCourseSelect from "./ClassesAdvancedQueryCourseSelect";
import { useClassesAdvancedQuery } from "../../hooks/filters/useClassesAdvancedQuery";

const ClassesAdvancedQuery = () => {
  const { t } = useTranslation();

  const {
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
  } = useClassesAdvancedQuery();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isAdvancedQuery && (
        <m.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden p-0.5"
        >
          <form id="query-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Card className="shadow-xs">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ClassesAdvancedQueryGroup
                      icon={UserPen}
                      title={t("classes.fields.teacher")}
                      isSelected={Boolean(selectedTeachers)}
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
                      icon={LibraryBig}
                      title={t("classes.fields.course")}
                      isSelected={Boolean(selectedCourses?.length)}
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
                      icon={CalendarIcon}
                      title={`${t("classes.fields.startDate")} & ${t("classes.fields.endDate")}`}
                      isSelected={Boolean(startDate || endDate)}
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
                      icon={Clock}
                      title={t("classes.advancedQuery.timeRange")}
                      isSelected={Boolean(startTime || endTime)}
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
                                {t("classes.fields.startTime")}
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
                                {t("classes.fields.endTime")}
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
                      icon={DollarSign}
                      title={t("classes.advancedQuery.priceRange")}
                      isSelected={Boolean(minPrice || maxPrice)}
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
                                {t("classes.advancedQuery.minPrice")}
                              </Label>
                              <NumberInput
                                field={field}
                                fieldState={fieldState}
                                id="minPrice"
                                placeholder={t("classes.advancedQuery.min")}
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
                                {t("classes.advancedQuery.maxPrice")}
                              </Label>
                              <NumberInput
                                field={field}
                                fieldState={fieldState}
                                id="maxPrice"
                                placeholder={t("classes.advancedQuery.max")}
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
                    icon={Filter}
                    title={t("classes.advancedQuery.queryActions")}
                    className="flex flex-row items-center justify-between space-y-0"
                  >
                    <div className="space-x-3 flex items-center">
                      {hasActiveFilters && (
                        <Badge
                          variant="secondary"
                          className="px-2 py-0 text-muted-foreground"
                        >
                          {t("classes.advancedQuery.selected")}
                        </Badge>
                      )}

                      <Button
                        variant="outline"
                        onClick={handleCancelAll}
                        disabled={!hasActiveFilters}
                        type="button"
                      >
                        <RotateCcw className="size-3.5" />
                        {t("classes.advancedQuery.cancelAll")}
                      </Button>
                      <Button variant="default" type="submit">
                        <Search className="size-3.5" />
                        {t("classes.advancedQuery.applyFilters")}
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
