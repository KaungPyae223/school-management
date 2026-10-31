import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { courseService } from "../../../../services/courses";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";
import { useGetCourseInputData } from "../api/useGetCourseInputData";

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

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetCourseInputData(debouncedSearchTerm);

  const getSelectedCourses = async (courseIDs: number[]) => {
    const res = await courseService.searchAllCourses({
      courseIDs,
    });

    setSelectedCourses(res.data);
  };

  useEffect(() => {
    const courseIDsFromURL = searchParams.get("courseIds");
    const urlCourseValue =
      courseIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlCourseValue.length > 0) {
      getSelectedCourses(urlCourseValue);
    }
  }, []);

  useEffect(() => {
    if (!field.value) {
      setSelectedCourses([]);
    }
  }, [field.value]);

  const handleSelectCourse = (course: Course) => {
    if (courseValue.includes(course.id)) return;

    const updated = [...courseValue, course.id].filter(Boolean).join(",");
    field.onChange(updated);
    setSelectedCourses((prev) => [...prev, course]);
    setShowDropDown(false);
    handleSearchChange("");
  };

  const handleRemoveCourse = (courseId: number) => {
    const updated = courseValue.filter((id: number) => id !== courseId).join(",");
    field.onChange(updated);
    setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const displayCourses = courses.filter(
    (course: Course) => !courseValue.includes(course?.id),
  );

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourses,
    displayCourses,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  };
};
