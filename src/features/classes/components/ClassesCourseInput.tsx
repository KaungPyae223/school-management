import { Field, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import RequiredLabel from "../../../components/form/RequiredLabel";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { BookOpen, Trash } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import ImageDisplay from "../../../components/image/ImageDisplay";

interface Course {
  id: string;
  name: string;
  image?: string;
  price: number;
}

const ClassesCourseInput = ({
  field,
  fieldState,
  defaultSelectedCourse,
  setValue,
}: {
  field: ControllerRenderProps<any, "courseId">;
  fieldState: ControllerFieldState;
  defaultSelectedCourse?: Course;
  setValue: any;
}) => {
  const courseValue = field.value;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCourseDropDown, setShowCourseDropDown] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course>(null);
  const [courseData, setCourseData] = useState<unknown[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchCourses = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await window.api.searchAllCourses({
        search: value,
        page: page,
        limit: 5,
      });
      const results = response?.data ?? [];
      setCourseData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses("", false);
  }, []);

  useEffect(() => {
    if (defaultSelectedCourse && field.value == defaultSelectedCourse.id) {
      setSelectedCourse(defaultSelectedCourse);
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
          courseData.length > 0
        ) {
          fetchCourses(searchTerm);
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

  const debouncedCourseSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchCourses(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedCourseSearch(searchTerm);

    return () => {
      debouncedCourseSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <RequiredLabel id="courseID">Course</RequiredLabel>

      <div className="relative">
        <Input
          id="courseID"
          value={searchTerm}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          onFocus={() => setShowCourseDropDown(true)}
          onBlur={() => setShowCourseDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder="Search for a course..."
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />
        {showCourseDropDown && courseData.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-72">
              {courseData.map((data: Course) => (
                <div
                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    field.onChange(data.id);
                    setSelectedCourse(data);
                    setValue("price", data.price);
                    setShowCourseDropDown(false);
                    setSearchTerm("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <ImageDisplay
                      image={data.image}
                      alt={data.name}
                      fallbackIcon={BookOpen}
                      display="list"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Course</p>
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

      {selectedCourse && courseValue !== 0 && (
        <div className="mt-2 flex items-center justify-between bg-card rounded-lg border border-border  p-3 ">
          <div className="flex items-center gap-3">
            <ImageDisplay
              image={selectedCourse.image}
              alt={selectedCourse.name}
              fallbackIcon={BookOpen}
              display="list"
            />
            <div>
              <p className="text-xs text-muted-foreground">Course</p>
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
              onClick={() => {
                field.onChange(0);
                setSelectedCourse(null);
                setValue("price", 0);
                setSearchTerm("");
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
