import { Field, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

const ClassesCourseInput = ({
  field,
  fieldState,
  defaultSelectedCourse,
}: {
  field: any;
  fieldState: any;
  defaultSelectedCourse?: any;
}) => {
  const [courseName, setCourseName] = useState<string>("");
  const [showCourseDropDown, setShowCourseDropDown] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(
    defaultSelectedCourse,
  );
  const [courseData, setCourseData] = useState<any>([]);

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

  useEffect(() => {
    if (courseName.length > 2) {
      debouncedUpdateParams(courseName);
    } else {
      setShowCourseDropDown(false);
      setCourseData([]);
    }

    return () => {
      debouncedUpdateParams.cancel();
    };
  }, [courseName]);

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="courseID">Course</RequiredLabel>

      <div className="relative">
        <Input
          id="courseID"
          value={courseName}
          onChange={(e) => {
            setCourseName(e.target.value);
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
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    field.onChange(data.id);
                    setSelectedCourse(data);
                    setShowCourseDropDown(false);
                    setCourseName("");
                  }}
                >
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
              ))}
            </ScrollArea>
          </div>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

      {selectedCourse && (
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

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => {
              field.onChange(null);
              setSelectedCourse(null);
              setCourseName("");
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default ClassesCourseInput;
