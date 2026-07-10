import { Field, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import { debounce } from "lodash";
import { useState } from "react";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

const ClassesCourseInput = ({
  field,
  fieldState,
  defaultSelectedCourse,
  setValue,
}: {
  field: ControllerRenderProps<any, "courseId">;
  fieldState: ControllerFieldState;
  defaultSelectedCourse?: unknown;
  setValue: any;
}) => {
  const courseValue = field.value;

  const [courseName, setCourseName] = useState<string>("");
  const [showCourseDropDown, setShowCourseDropDown] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<unknown>(
    defaultSelectedCourse,
  );
  const [courseData, setCourseData] = useState<unknown[]>([]);

  const debouncedUpdateParams = debounce((value: string) => {
    window.api
      .searchAllCourses({ search: value })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setShowCourseDropDown(true);
          setCourseData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, 750);

  const handleCourseChange = (value: string) => {
    setCourseName(value);

    if (value.length <= 2) {
      setShowCourseDropDown(false);
      setCourseData([]);
      debouncedUpdateParams.cancel();
      return;
    }

    debouncedUpdateParams(value);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="courseID">Course</RequiredLabel>

      <div className="relative">
        <Input
          id="courseID"
          value={courseName}
          onChange={(e) => {
            handleCourseChange(e.target.value);
          }}
          onFocus={() => setShowCourseDropDown(true)}
          onBlur={() => setShowCourseDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a course..."
          autoComplete="off"
          className={fieldState.invalid ? "border-destructive" : ""}
        />
        {showCourseDropDown && courseData.length > 0 && (
          <div className=" absolute w-full z-50 bg-white border divide-y rounded-lg mt-1">
            <ScrollArea className="max-h-72">
              {courseData.map((data) => (
                <div
                  className="flex items-center justify-between  p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    field.onChange(data.id);
                    setSelectedCourse(data);
                    setValue("price", data.price);
                    setShowCourseDropDown(false);
                    setCourseName("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={data.image}
                      className="h-10 w-10 object-cover items-center rounded-md"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Course</p>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {data.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    ${data.price}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedCourse && courseValue !== 0 && (
        <div className="mt-2 bg-green-100 flex items-center justify-between rounded-lg border border-green-300  p-3 ">
          <div className="flex items-center gap-3">
            <img
              src={selectedCourse.image}
              className="h-10 w-10 object-cover items-center rounded-md"
            />
            <div>
              <p className="text-xs text-gray-500">Course</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {selectedCourse.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-800">
              ${selectedCourse.price}
            </p>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={() => {
                field.onChange(0);
                setSelectedCourse(null);
                setValue("price", 0);
                setCourseName("");
              }}
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
