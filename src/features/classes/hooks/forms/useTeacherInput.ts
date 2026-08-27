import { useEffect, useMemo, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { teacherService } from "../../../../services/teachers";

export interface Teacher {
  id: string;
  name: string;
  image?: string;
}

export const useTeacherInput = (
  field: ControllerRenderProps<any, "teacherId">,
  defaultSelectedTeacher?: Teacher
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchTeachers = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await teacherService.searchAllTeachers({
        search: value,
        page,
        limit: 5,
        onlyActive: true,
      });
      const results: Teacher[] = response?.data ?? [];
      setTeacherData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers("", false);
  }, []);

  useEffect(() => {
    if (defaultSelectedTeacher && field.value == defaultSelectedTeacher.id) {
      setSelectedTeacher(defaultSelectedTeacher);
    } else if (field.value == 0) {
      setSelectedTeacher(null);
    }
  }, [field.value, defaultSelectedTeacher]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    if (!currentLoadingRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && teacherData.length > 0) {
          fetchTeachers(searchTerm);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentLoadingRef);

    return () => observer.disconnect();
  }, [hasMore, isLoading, teacherData.length, searchTerm]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchTeachers(value, false);
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

  const handleSelectTeacher = (teacher: Teacher) => {
    field.onChange(teacher.id);
    setSelectedTeacher(teacher);
    setShowDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveTeacher = () => {
    field.onChange(0);
    setSelectedTeacher(null);
  };

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedTeacher,
    teacherData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  };
};
