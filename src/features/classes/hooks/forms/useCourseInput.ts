import { useEffect, useMemo, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { courseService } from "../../../../services/courses";

export interface Course {
  id: string;
  name: string;
  image?: string;
  price: number;
}

export const useCourseInput = (
  field: ControllerRenderProps<any, "courseId">,
  setValue: any,
  defaultSelectedCourse?: Course
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchCourses = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await courseService.searchAllCourses({
        search: value,
        page,
        limit: 5,
        onlyActive: true,
      });
      const results: Course[] = response?.data ?? [];
      setCourseData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage((prevPage) => prevPage + 1);
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
    } else if (field.value == 0) {
      setSelectedCourse(null);
    }
  }, [field.value, defaultSelectedCourse]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    if (!currentLoadingRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && courseData.length > 0) {
          fetchCourses(searchTerm);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentLoadingRef);

    return () => observer.disconnect();
  }, [hasMore, isLoading, courseData.length, searchTerm]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchCourses(value, false);
      }, 750),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSelectCourse = (course: Course) => {
    field.onChange(course.id);
    setSelectedCourse(course);
    setValue("price", course.price);
    setShowDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveCourse = () => {
    field.onChange(0);
    setSelectedCourse(null);
    setValue("price", 0);
    setSearchTerm("");
  };

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourse,
    courseData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  };
};
