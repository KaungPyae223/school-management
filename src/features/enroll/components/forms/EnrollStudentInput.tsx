import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { Trash } from "lucide-react";
import { Field, FieldError } from "../../../../components/ui/field";
import { Input } from "../../../../components/ui/input";
import RequiredLabel from "../../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Button } from "../../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { cn } from "../../../../lib/utils";
import { useEnrollStudentInput } from "../../hooks/forms/useEnrollStudentInput";

interface EnrollStudentInputProps {
  field: ControllerRenderProps<any, "studentId">;
  fieldState: ControllerFieldState;
}

const EnrollStudentInput = ({ field, fieldState }: EnrollStudentInputProps) => {
  const {
    studentValue,
    searchTerm,
    showStudentDropDown,
    setShowStudentDropDown,
    selectedStudent,
    students,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    handleSearchChange,
    handleSelectStudent,
    handleRemoveStudent,
  } = useEnrollStudentInput(field);

  if (error) {
    throw error;
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="studentID">Student</RequiredLabel>

      <div className="relative">
        <Input
          id="studentID"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowStudentDropDown(true)}
          onBlur={() => setShowStudentDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a student..."
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />
        {showStudentDropDown && students.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1">
            <ScrollArea className="max-h-80">
              {students.map((data: any) => (
                <div
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => handleSelectStudent(data)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">Student</p>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
              {hasNextPage && (
                <div ref={loadingRef} className="py-2 text-center">
                  {(isLoading || isFetchingNextPage) && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      Loading more...
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedStudent && studentValue !== 0 && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedStudent.image}
                alt={selectedStudent.name}
              />
              <AvatarFallback>
                {generateImageFallBack(selectedStudent.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Student</p>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {selectedStudent.name}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={handleRemoveStudent}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default EnrollStudentInput;
