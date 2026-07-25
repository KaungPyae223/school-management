import { Field, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

const EnrollStudentInput = ({
  field,
  fieldState,
  defaultSelectedStudent,
}: {
  field: ControllerRenderProps<any, "studentID">;
  fieldState: ControllerFieldState;
  defaultSelectedStudent?: unknown;
}) => {
  const studentValue = field.value;

  const [studentName, setStudentName] = useState<string>("");
  const [showStudentDropDown, setShowStudentDropDown] =
    useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<unknown>(null);
  const [studentData, setStudentData] = useState<unknown[]>([]);

  useEffect(() => {
    if (defaultSelectedStudent) {
      setSelectedStudent(defaultSelectedStudent);
    }
  }, [defaultSelectedStudent]);

  const debouncedUpdateParams = debounce((value: string) => {
    window.api
      .searchAllStudents({ search: value })
      .then((res) => {
        if (res.data) {
          setShowStudentDropDown(true);
          setStudentData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, 750);

  const handleStudentChange = (value: string) => {
    setStudentName(value);

    if (value.length <= 2) {
      setShowStudentDropDown(false);
      setStudentData([]);
      debouncedUpdateParams.cancel();
      return;
    }

    debouncedUpdateParams(value);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="studentID">Student</RequiredLabel>

      <div className="relative">
        <Input
          id="studentID"
          value={studentName}
          onChange={(e) => {
            handleStudentChange(e.target.value);
          }}
          onFocus={() => setShowStudentDropDown(true)}
          onBlur={() => setShowStudentDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a student..."
          autoComplete="off"
          className={fieldState.invalid ? "border-destructive" : ""}
        />
        {showStudentDropDown && studentData.length > 0 && (
          <div className=" absolute w-full z-50 bg-white border divide-y rounded-lg mt-1">
            <ScrollArea className="max-h-72">
              {studentData.map((data) => (
                <div
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    field.onChange(data.id);
                    setSelectedStudent(data);
                    setShowStudentDropDown(false);
                    setStudentName("");
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">Student</p>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedStudent && studentValue !== 0 && (
        <div className="mt-2 flex items-center justify-between rounded-lg border border-border  p-3 ">
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
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {selectedStudent.name}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => {
              field.onChange(0);
              setSelectedStudent(null);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default EnrollStudentInput;
