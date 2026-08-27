import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { teacherService } from "../../../../services/teachers";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useTeacherSelect = (field: ControllerRenderProps<any, "teacherIds">) => {
  const [searchParams] = useSearchParams();

  const teacherValue = useMemo(
    () => field.value?.split(",").filter(Boolean).map(Number) ?? [],
    [field.value]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);
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

  const fetchSelectedTeachers = async (teacherIDs: number[]) => {
    try {
      const response = await teacherService.searchAllTeachers({ teacherIDs });
      const results: Teacher[] = response?.data ?? [];
      setSelectedTeachers(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers("", false);

    const teacherIDsFromURL = searchParams.get("teacherIds");
    const urlTeacherValue =
      teacherIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlTeacherValue.length > 0) {
      fetchSelectedTeachers(urlTeacherValue);
    }
  }, []);

  useEffect(() => {
    if (!field.value) {
      setSelectedTeachers([]);
    }
  }, [field.value]);

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
    if (teacherValue.includes(teacher.id)) return;

    const updated = [...teacherValue, teacher.id].filter(Boolean).join(",");
    field.onChange(updated);
    setSelectedTeachers((prev) => [...prev, teacher]);
    setShowDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveTeacher = (teacherId: number) => {
    const updated = teacherValue.filter((id) => id !== teacherId).join(",");
    field.onChange(updated);
    setSelectedTeachers((prev) => prev.filter((t) => t.id !== teacherId));
  };

  const displayTeachers = teacherData.filter(
    (teacher) => !teacherValue.includes(teacher?.id)
  );

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedTeachers,
    displayTeachers,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  };
};
