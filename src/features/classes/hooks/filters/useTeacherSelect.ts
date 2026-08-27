import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { teacherService } from "../../../../services/teachers";
import { useFetchTeachersForSelect } from "../api/useFetchTeachersForSelect";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useTeacherSelect = (
  field: ControllerRenderProps<any, "teacherIds">,
) => {
  const [searchParams] = useSearchParams();

  const teacherValue = useMemo(
    () => field.value?.split(",").filter(Boolean).map(Number) ?? [],
    [field.value],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const {
    fetchTeachers,
    fetchSelectedTeachers,
    setPage,
    isLoading,
    hasMore,
    setHasMore,
  } = useFetchTeachersForSelect({
    setSelectedTeachers,
    setTeacherData,
  });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchFunction: fetchTeachers,
    searchTerm,
  });

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

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchTeachers(value, false);
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
    (teacher) => !teacherValue.includes(teacher?.id),
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
