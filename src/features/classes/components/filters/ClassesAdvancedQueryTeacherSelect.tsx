import { useTranslation } from "react-i18next";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { X } from "lucide-react";

import { Field } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { cn } from "../../../../lib/utils";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import {
  useTeacherSelect,
  type Teacher,
} from "../../hooks/filters/useTeacherSelect";
import ScrollSelectLoading from "../../../../components/form/ScrollSelectLoading";

interface ClassesAdvancedQueryTeacherSelectProps {
  field: ControllerRenderProps<any, "teacherIds">;
  fieldState: ControllerFieldState;
}

const ClassesAdvancedQueryTeacherSelect = ({
  field,
  fieldState,
}: ClassesAdvancedQueryTeacherSelectProps) => {
  const { t } = useTranslation();

  const {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedTeachers,
    displayTeachers,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    error,
    loadingRef,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  } = useTeacherSelect(field);

  if (error) {
    throw error;
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="relative">
        <Input
          id="teacherID"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder={t("classes.fields.teacherPlaceholder")}
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />

        {showDropDown && displayTeachers.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-80">
              {displayTeachers.map((data: Teacher) => (
                <div
                  key={data.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  onMouseDown={() => handleSelectTeacher(data)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("classes.fields.teacher")}
                    </p>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {data.name}
                    </p>
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
        {selectedTeachers.length === 0 ? (
          <span className="text-xs text-muted-foreground self-center">
            {t("classes.advancedQuery.noTeacherSelected")}
          </span>
        ) : (
          selectedTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex text-sm items-center gap-1.5 text-foreground/80 p-0.5 ps-2 rounded-lg border"
            >
              <span>{teacher.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleRemoveTeacher(teacher.id)}
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

export default ClassesAdvancedQueryTeacherSelect;
