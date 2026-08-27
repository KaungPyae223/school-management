import { useEffect, useState } from "react";

import type { ControllerRenderProps } from "react-hook-form";
import { studentService } from "../../../../services/students";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";

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
  const [studentData, setStudentData] = useState<Student[]>([]);

  const {
    fetchData,
    isLoading,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setStudentData,
    fetchFunction: studentService.searchAllStudents,
  });

  useEffect(() => {
    fetchData("", false);
  }, []);

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
    studentData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectStudent,
    handleRemoveStudent,
  };
};
