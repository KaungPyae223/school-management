import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { teacherService } from "../../../../services/teachers";
import { useGetTeacherInputData } from "../api/useGetTeacherInputData";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";

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

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    teachers,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTeacherInputData(debouncedSearchTerm);

  const getSelectedTeachers = async (teacherIDs: number[]) => {
    const res = await teacherService.searchAllTeachers({
      teacherIDs,
    });

    setSelectedTeachers(res.data);
  };

  useEffect(() => {
    const teacherIDsFromURL = searchParams.get("teacherIds");
    const urlTeacherValue =
      teacherIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlTeacherValue.length > 0) {
      getSelectedTeachers(urlTeacherValue);
    }
  }, []);

  useEffect(() => {
    if (!field.value) {
      setSelectedTeachers([]);
    }
  }, [field.value]);

  const handleSelectTeacher = (teacher: Teacher) => {
    if (teacherValue.includes(teacher.id)) return;

    const updated = [...teacherValue, teacher.id].filter(Boolean).join(",");
    field.onChange(updated);
    setSelectedTeachers((prev) => [...prev, teacher]);
    setShowDropDown(false);
    handleSearchChange("");
  };

  const handleRemoveTeacher = (teacherId: number) => {
    const updated = teacherValue
      .filter((id: number) => id !== teacherId)
      .join(",");
    field.onChange(updated);
    setSelectedTeachers((prev) => prev.filter((t) => t.id !== teacherId));
  };

  const displayTeachers = teachers.filter(
    (teacher: Teacher) => !teacherValue.includes(teacher?.id),
  );

  return {
    searchTerm,
    showDropDown,
    setShowDropDown,
    selectedTeachers,
    displayTeachers,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    error,
    loadingRef,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  };
};
