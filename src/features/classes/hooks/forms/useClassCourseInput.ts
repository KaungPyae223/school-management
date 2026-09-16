import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";
import { useGetCourseInputData } from "../api/useGetCourseInputData";

export interface Course {
  id: number;
  name: string;
  image?: string;
  price?: string;
}

export const useClassCourseInput = (
  field: ControllerRenderProps<any, "courseId">,
  setValue: any,
  defaultSelectedCourse?: Course,
) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetCourseInputData(debouncedSearchTerm, true);

  useEffect(() => {
    if (defaultSelectedCourse && field.value == defaultSelectedCourse.id) {
      setSelectedCourse(defaultSelectedCourse);
    } else if (field.value == 0) {
      setSelectedCourse(null);
    }
  }, [field.value, defaultSelectedCourse]);

  const handleSelectCourse = (course: Course) => {
    field.onChange(course.id);
    setSelectedCourse(course);
    setValue("price", course.price);
    setShowDropDown(false);
    handleSearchChange("");
  };

  const handleRemoveCourse = () => {
    field.onChange(0);
    setSelectedCourse(null);
    setValue("price", 0);
  };

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedCourse,
    isLoading,
    courses,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  };
};
