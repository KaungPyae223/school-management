import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { courseService } from "../../../../services/courses";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";

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
  const [courseData, setCourseData] = useState<Course[]>([]);

  const {
    fetchData,
    fetchSelectedData,
    isLoading,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setCourseData,
    setSelectedData: setSelectedCourses,
    fetchFunction: courseService.searchAllCourses,
  });

  useEffect(() => {
    fetchData("", false);

    const courseIDsFromURL = searchParams.get("courseIds");
    const urlCourseValue =
      courseIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlCourseValue.length > 0) {
      fetchSelectedData(urlCourseValue);
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
