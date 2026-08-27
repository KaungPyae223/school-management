import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";
import { courseService } from "../../../../services/courses";

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
  const [courseData, setCourseData] = useState<Course[]>([]);

  const {
    fetchData,
    isLoading,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setCourseData,
    fetchFunction: courseService.searchAllCourses,
    onlyActive: true,
  });

  useEffect(() => {
    fetchData("", false);
  }, []);

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
    courseData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectCourse,
    handleRemoveCourse,
  };
};
