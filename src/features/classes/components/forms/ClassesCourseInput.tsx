import { useTranslation } from "react-i18next";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { BookOpen, Trash } from "lucide-react";

import { Field, FieldError } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { cn } from "../../../../lib/utils";
import {
  useClassCourseInput,
  type Course,
} from "../../hooks/forms/useClassCourseInput";

interface ClassesCourseInputProps {
  field: ControllerRenderProps<any, "courseId">;
  fieldState: ControllerFieldState;
  defaultSelectedCourse?: Course;
  setValue: any;
}

const ClassesCourseInput = ({
  field,
  fieldState,
  defaultSelectedCourse,
  setValue,
}: ClassesCourseInputProps) => {
  const { t } = useTranslation();

  const {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourse,
    isLoading,
    courses,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  } = useClassCourseInput(field, setValue, defaultSelectedCourse);

  if (error) {
    throw error;
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="courseID">{t("classes.fields.course")}</RequiredLabel>

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

        {showDropDown && courses.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-80">
              {courses.map((data: Course) => (
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
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    ${data.price}
                  </p>
                </div>
              ))}

              {isFetchingNextPage && (
                <div ref={loadingRef} className="py-2 text-center">
                  {(isLoading || isFetchingNextPage) && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      {t("form.loading")}
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedCourse && field.value !== 0 && (
        <div className="mt-2 flex items-center justify-between bg-card rounded-lg border border-border p-3">
          <div className="flex items-center gap-3">
            <ImageDisplay
              image={selectedCourse.image}
              alt={selectedCourse.name}
              fallbackIcon={BookOpen}
              display="list"
            />
            <div>
              <p className="text-xs text-muted-foreground">
                {t("classes.fields.course")}
              </p>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {selectedCourse.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-foreground">
              ${selectedCourse.price}
            </p>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={handleRemoveCourse}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Field>
  );
};

export default ClassesCourseInput;
