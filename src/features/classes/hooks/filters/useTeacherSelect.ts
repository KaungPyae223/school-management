import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { ControllerRenderProps } from "react-hook-form";
import { teacherService } from "../../../../services/teachers";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";

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
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const {
    fetchData,
    fetchSelectedData,
    isLoading,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setTeacherData,
    setSelectedData: setSelectedTeachers,
    fetchFunction: teacherService.searchAllTeachers,
  });

  useEffect(() => {
    fetchData("", false);

    const teacherIDsFromURL = searchParams.get("teacherIds");
    const urlTeacherValue =
      teacherIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    if (urlTeacherValue.length > 0) {
      fetchSelectedData(urlTeacherValue);
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
