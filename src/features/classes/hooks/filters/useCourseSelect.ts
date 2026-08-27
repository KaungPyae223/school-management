import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { courseService } from "../../../../services/courses";

export interface Course {
  id: number;
  name: string;
  image?: string;
}

export const useCourseSelect = (field: ControllerRenderProps<any, "courseIds">) => {
  const [searchParams] = useSearchParams();

  const courseValue = useMemo(
    () => field.value?.split(",").filter(Boolean).map(Number) ?? [],
    [field.value]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
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
    (course) => !courseValue.includes(course?.id)
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
