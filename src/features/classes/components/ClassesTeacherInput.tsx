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

const ClassesTeacherInput = ({
  field,
  fieldState,
  defaultSelectedTeacher,
}: {
  field: any;
  fieldState: any;
  defaultSelectedTeacher?: any;
}) => {
  const [teacherName, setTeacherName] = useState<string>("");
  const [showTeacherDropDown, setShowTeacherDropDown] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(
    defaultSelectedTeacher,
  );
  const [teacherData, setTeacherData] = useState<any>([]);

  const debouncedUpdateParams = debounce((value: string) => {
    window.api
      .searchAllTeachers({ search: value })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setShowTeacherDropDown(true);
          setTeacherData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, 750);

  useEffect(() => {
    if (teacherName.length > 2) {
      debouncedUpdateParams(teacherName);
    } else {
      setShowTeacherDropDown(false);
      setTeacherData([]);
    }

    return () => {
      debouncedUpdateParams.cancel();
    };
  }, [teacherName]);

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="teacherID">Teacher</RequiredLabel>

      <div className="relative">
        <Input
          id="teacherID"
          value={teacherName}
          onChange={(e) => {
            setTeacherName(e.target.value);
          }}
          onFocus={() => setShowTeacherDropDown(true)}
          onBlur={() => setShowTeacherDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a teacher..."
          autoComplete="off"
          className={fieldState.invalid ? "border-destructive" : ""}
        />
        {showTeacherDropDown && teacherData.length > 0 && (
          <div className=" absolute w-full z-50 bg-white border divide-y rounded-lg mt-1">
            <ScrollArea className="max-h-72">
              {teacherData.map((data) => (
                <div
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    field.onChange(data.id);
                    setSelectedTeacher(data);
                    setShowTeacherDropDown(false);
                    setTeacherName("");
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-gray-500">Teacher</p>
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

      {selectedTeacher && (
        <div className="mt-2 flex items-center justify-between rounded-lg border border-border  p-3 ">
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
              <p className="text-xs text-gray-500">Teacher</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {selectedTeacher.name}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => {
              field.onChange(null);
              setSelectedTeacher(null);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Field>
  );
};

export default ClassesTeacherInput;
