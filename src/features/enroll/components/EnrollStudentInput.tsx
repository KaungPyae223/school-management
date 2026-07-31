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

interface Student {
  id: string;
  name: string;
  image?: string;
}

const EnrollStudentInput = ({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, "studentId">;
  fieldState: ControllerFieldState;
}) => {
  const studentValue = field.value;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showStudentDropDown, setShowStudentDropDown] =
    useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchStudents = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await window.api.searchAllStudents({
        search: value,
        page: page,
        limit: 5,
      });
      const results: Student[] = response?.data ?? [];
      setStudentData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents("", false);
  }, []);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !isLoading &&
          studentData.length > 0
        ) {
          fetchStudents(searchTerm);
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

  const debouncedStudentSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchStudents(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedStudentSearch(searchTerm);

    return () => {
      debouncedStudentSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="studentID">Student</RequiredLabel>

      <div className="relative">
        <Input
          id="studentID"
          value={searchTerm}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          onFocus={() => setShowStudentDropDown(true)}
          onBlur={() => setShowStudentDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a student..."
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
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
                    <p className="text-xs text-muted-foreground">Student</p>
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
