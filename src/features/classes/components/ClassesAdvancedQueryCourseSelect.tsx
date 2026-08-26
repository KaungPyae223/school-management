import { useTranslation } from "react-i18next";
import { Field } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { BookOpen, X } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import ImageDisplay from "../../../components/image/ImageDisplay";
import { courseService } from "../../../services/courses";
import { useSearchParams } from "react-router";

interface Course {
  id: number;
  name: string;
  image?: string;
}

const ClassesAdvancedQueryCourseSelect = ({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, "courseIds">;
  fieldState: ControllerFieldState;
}) => {
  const { t } = useTranslation();
  const courseValue = field.value?.split(",").filter(Boolean).map(Number) ?? [];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCourseDropDown, setShowCourseDropDown] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course[]>([]);
  const [courseData, setCourseData] = useState<unknown[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [searchParams] = useSearchParams();

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchCourses = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await courseService.searchAllCourses({
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

  const fetchSelectedCourses = async (courseIDs: number[]) => {
    try {
      const response = await courseService.searchAllCourses({
        courseIDs: courseIDs,
      });
      const results: Course[] = response?.data ?? [];
      setSelectedCourse(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses("", false);

    const courseIDsFromURL = searchParams.get("courseIds");
    const urlCourseValue =
      courseIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    console.log(courseIDsFromURL);

    if (urlCourseValue.length > 0) {
      fetchSelectedCourses(urlCourseValue);
    }
  }, []);

  useEffect(() => {
    if (field.value == "") {
      setSelectedCourse([]);
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

  const handleSelectCourse = (course: Course) => {
    if (courseValue.includes(course.id)) {
      return;
    }

    field.onChange(
      [...courseValue, course.id].filter((item) => item !== "").join(","),
    );
    setSelectedCourse((prev) => [...prev, course]);
    setShowCourseDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveCourse = (courseID: number) => {
    const newTeacherValue = courseValue
      .filter((teacher) => teacher !== courseID)
      .join(",");

    field.onChange(newTeacherValue);

    setSelectedCourse((prev) =>
      prev.filter((course) => course.id !== courseID),
    );
  };
  const displayCourseData = courseData.filter(
    (course: Course) => !courseValue.includes(course?.id),
  );

  return (
    <Field data-invalid={fieldState.invalid}>
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
          placeholder={t("classes.fields.coursePlaceholder")}
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />
        {showCourseDropDown && displayCourseData.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-72">
              {displayCourseData.map((data: Course) => (
                <div
                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    handleSelectCourse(data);
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
                      <p className="text-xs text-muted-foreground">
                        {t("classes.fields.course")}
                      </p>
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {data.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div ref={loadingRef} className="py-2 text-center">
                  {isLoading && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      {t("form.loading")}
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start items-center gap-3 mt-1.5 p-2 border rounded-md">
        {selectedCourse.length === 0 ? (
          <span className="text-xs text-muted-foreground self-center">
            {t("classes.advancedQuery.noCourseSelected")}
          </span>
        ) : (
          selectedCourse.map((course) => (
            <div
              className="flex text-sm items-center gap-1.5 text-foreground/80 p-0.5 ps-2 rounded-lg border"
              key={course.id}
            >
              <span>{course.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleRemoveCourse(course.id)}
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

export default ClassesAdvancedQueryCourseSelect;
