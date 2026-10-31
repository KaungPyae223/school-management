import { useTranslation } from "react-i18next";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { Trash } from "lucide-react";

import { Field, FieldError } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { cn } from "../../../../lib/utils";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import {
  useClassTeacherInput,
  type Teacher,
} from "../../hooks/forms/useClasssTeacherInput";
import ScrollSelectLoading from "../../../../components/form/ScrollSelectLoading";

interface ClassesTeacherInputProps {
  field: ControllerRenderProps<any, "teacherId">;
  fieldState: ControllerFieldState;
  defaultSelectedTeacher?: Teacher;
}

const ClassesTeacherInput = ({
  field,
  fieldState,
  defaultSelectedTeacher,
}: ClassesTeacherInputProps) => {
  const { t } = useTranslation();

  const {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedTeacher,
    isLoading,
    loadingRef,
    teachers,
    error,
    isFetchingNextPage,
    hasNextPage,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  } = useClassTeacherInput(field, defaultSelectedTeacher);

  if (error) {
    throw error;
  }

  return (
    <Field data-tour="select-teacher" data-invalid={fieldState.invalid}>
      <RequiredLabel id="teacherID">
        {t("classes.fields.teacher")}
      </RequiredLabel>

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

        {showDropDown && teachers.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-80">
              {teachers.map((data: any) => (
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

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedTeacher && field.value !== 0 && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
              />
              <AvatarFallback>
                {generateImageFallBack(selectedTeacher.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("classes.fields.teacher")}
              </p>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {selectedTeacher.name}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={handleRemoveTeacher}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default ClassesTeacherInput;
