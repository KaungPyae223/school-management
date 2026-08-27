import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
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

export const useCourseSelect = (
  field: ControllerRenderProps<any, "courseIds">,
) => {
  const [searchParams] = useSearchParams();

  const courseValue = useMemo(
    () => field.value?.split(",").filter(Boolean).map(Number) ?? [],
    [field.value],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [courseData, setCourseData] = useState<Course[]>([]);

  const {
    fetchCourses,
    fetchSelectedCourses,
    setPage,
    isLoading,
    hasMore,
    setHasMore,
  } = useFetchCoursesForSelect({
    setSelectedCourses,
    setCourseData,
  });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchFunction: fetchCourses,
    searchTerm,
  });

  useEffect(() => {
    fetchCourses("", false);

    const courseIDsFromURL = searchParams.get("courseIds");
    const urlCourseValue =
      courseIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlCourseValue.length > 0) {
      fetchSelectedCourses(urlCourseValue);
    }
  }, []);

  useEffect(() => {
    if (!field.value) {
      setSelectedCourses([]);
    }
  }, [field.value]);

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
    if (courseValue.includes(course.id)) return;

    const updated = [...courseValue, course.id].filter(Boolean).join(",");
    field.onChange(updated);
    setSelectedCourses((prev) => [...prev, course]);
    setShowDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveCourse = (courseId: number) => {
    const updated = courseValue.filter((id) => id !== courseId).join(",");
    field.onChange(updated);
    setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const displayCourses = courseData.filter(
    (course) => !courseValue.includes(course?.id),
  );

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourses,
    displayCourses,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  };
};
