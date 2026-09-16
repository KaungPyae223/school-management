import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";
import { useGetTeacherInputData } from "../api/useGetTeacherInputData";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useClassTeacherInput = (
  field: ControllerRenderProps<any, "teacherId">,
  defaultSelectedTeacher?: Teacher,
) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    teachers,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTeacherInputData(debouncedSearchTerm, true);

  useEffect(() => {
    if (defaultSelectedTeacher && field.value == defaultSelectedTeacher.id) {
      setSelectedTeacher(defaultSelectedTeacher);
    } else if (field.value == 0) {
      setSelectedTeacher(null);
    }
  }, [field.value, defaultSelectedTeacher]);

  const handleSelectTeacher = (teacher: Teacher) => {
    field.onChange(teacher.id);
    setSelectedTeacher(teacher);
    setShowDropDown(false);
    handleSearchChange("");
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
    isLoading,
    loadingRef,
    teachers,
    error,
    isFetchingNextPage,
    hasNextPage,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  };
};
