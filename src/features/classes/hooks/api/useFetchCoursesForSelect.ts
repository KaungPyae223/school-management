import { useState } from "react";
import { courseService } from "../../../../services/courses";
import type { Course } from "../filters/useCourseSelect";

export const useFetchCoursesForSelect = ({
  setSelectedCourses,
  setCourseData,
  onlyActive = false,
}: {
  setSelectedCourses?: React.Dispatch<React.SetStateAction<Course[]>>;
  setCourseData: React.Dispatch<React.SetStateAction<Course[]>>;
  onlyActive?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCourses = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await courseService.searchAllCourses({
        search: value,
        page,
        limit: 5,
        onlyActive,
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

  const fetchSelectedCourses = async (courseIDs: number[]) => {
    try {
      const response = await courseService.searchAllCourses({ courseIDs });
      const results: Course[] = response?.data ?? [];
      setSelectedCourses(results);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchCourses,
    fetchSelectedCourses,
    isLoading,
    hasMore,
    setPage,
    setHasMore,
  };
};
