import { useEffect, useMemo, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { useFetchCoursesForSelect } from "../api/useFetchCoursesForSelect";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export interface Course {
  id: number;
  name: string;
  image?: string;
  price?: string;
}

export const useCourseInput = (
  field: ControllerRenderProps<any, "courseId">,
  setValue: any,
  defaultSelectedCourse?: Course,
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseData, setCourseData] = useState<Course[]>([]);

  const { fetchCourses, setPage, isLoading, hasMore, setHasMore } =
    useFetchCoursesForSelect({
      setCourseData,
      onlyActive: true,
    });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchFunction: fetchCourses,
    searchTerm,
  });

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

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchCourses(value, false);
      }, 750),
    [],
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
