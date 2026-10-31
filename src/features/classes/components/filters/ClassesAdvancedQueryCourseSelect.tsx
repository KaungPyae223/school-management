import { useTranslation } from "react-i18next";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { BookOpen, X } from "lucide-react";

import { Field } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { cn } from "../../../../lib/utils";
import {
  useCourseSelect,
  type Course,
} from "../../hooks/filters/useCourseSelect";
import ScrollSelectLoading from "../../../../components/form/ScrollSelectLoading";

interface ClassesAdvancedQueryCourseSelectProps {
  field: ControllerRenderProps<any, "courseIds">;
  fieldState: ControllerFieldState;
}

const ClassesAdvancedQueryCourseSelect = ({
  field,
  fieldState,
}: ClassesAdvancedQueryCourseSelectProps) => {
  const { t } = useTranslation();

  const {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourses,
    displayCourses,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  } = useCourseSelect(field);

  if (error) {
    throw error;
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="relative">
        <Input
          id="courseID"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder={t("classes.fields.coursePlaceholder")}
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />

        {showDropDown && displayCourses.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-80">
              {displayCourses.map((data: Course) => (
                <div
                  key={data.id}
                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer"
                  onMouseDown={() => handleSelectCourse(data)}
                >
                  <div className="flex items-center gap-3">
                    <ImageDisplay
                      image={data.image}
                      alt={data.name}
                      fallbackIcon={BookOpen}
                      display="list"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("classes.fields.course")}
                      </p>
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {data.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {hasNextPage && (
                <ScrollSelectLoading
                  loadingRef={loadingRef}
                  isLoading={isLoading}
                  isFetchingNextPage={isFetchingNextPage}
                />
              )}
            </ScrollArea>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-start items-center gap-3 mt-1.5 p-2 border rounded-md">
        {selectedCourses.length === 0 ? (
          <span className="text-xs text-muted-foreground self-center">
            {t("classes.advancedQuery.noCourseSelected")}
          </span>
        ) : (
          selectedCourses.map((course) => (
            <div
              key={course.id}
              className="flex text-sm items-center gap-1.5 text-foreground/80 p-0.5 ps-2 rounded-lg border"
            >
              <span>{course.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleRemoveCourse(course.id)}
              >
                <X />
              </Button>
            </div>
          ))
        )}
      </div>
    </Field>
  );
};

export default ClassesAdvancedQueryCourseSelect;
