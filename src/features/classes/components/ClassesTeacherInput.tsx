import { Field, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { cn } from "../../../lib/utils";

interface Teacher {
  id: string;
  name: string;
  image?: string;
}

const ClassesTeacherInput = ({
  field,
  fieldState,
  defaultSelectedTeacher,
}: {
  field: ControllerRenderProps<any, "teacherId">;
  fieldState: ControllerFieldState;
  defaultSelectedTeacher?: Teacher;
}) => {
  const teacherValue = field.value;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showTeacherDropDown, setShowTeacherDropDown] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>(null);
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchTeachers = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await window.api.searchAllTeachers({
        search: value,
        page: page,
        limit: 5,
      });
      const results: Teacher[] = response?.data ?? [];
      setTeacherData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers("", false);
  }, []);

  useEffect(() => {
    if (defaultSelectedTeacher && field.value == defaultSelectedTeacher.id) {
      setSelectedTeacher(defaultSelectedTeacher);
    }
  }, [field.value]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !isLoading &&
          teacherData.length > 0
        ) {
          fetchTeachers(searchTerm);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  const debouncedTeacherSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchTeachers(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedTeacherSearch(searchTerm);

    return () => {
      debouncedTeacherSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="teacherID">Teacher</RequiredLabel>

      <div className="relative">
        <Input
          id="teacherID"
          value={searchTerm}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          onFocus={() => setShowTeacherDropDown(true)}
          onBlur={() => setShowTeacherDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a teacher..."
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
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
                    setSearchTerm("");
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">Teacher</p>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div ref={loadingRef} className="py-2 text-center">
                  {isLoading && (
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

      {selectedTeacher && teacherValue !== 0 && (
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
              <p className="text-xs text-muted-foreground">Teacher</p>
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
              field.onChange(0);
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
