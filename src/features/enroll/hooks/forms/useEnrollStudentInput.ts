import { useState } from "react";

import type { ControllerRenderProps } from "react-hook-form";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";
import { useGetStudentInputData } from "../api/useGetStudentInputData";

export interface Student {
  id: string;
  name: string;
  image?: string;
}

export const useEnrollStudentInput = (
  field: ControllerRenderProps<any, "studentId">,
) => {
  const studentValue = field.value;

  const [showStudentDropDown, setShowStudentDropDown] =
    useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    students,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetStudentInputData(debouncedSearchTerm);

  const handleSelectStudent = (student: Student) => {
    field.onChange(student.id);
    setSelectedStudent(student);
    setShowStudentDropDown(false);
    handleSearchChange("");
  };

  const handleRemoveStudent = () => {
    field.onChange(0);
    setSelectedStudent(null);
  };

  return {
    studentValue,
    searchTerm,
    showStudentDropDown,
    setShowStudentDropDown,
    selectedStudent,
    students,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    handleSearchChange,
    handleSelectStudent,
    handleRemoveStudent,
  };
};
