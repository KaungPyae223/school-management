import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";
import { teacherService } from "../../../../services/teachers";

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
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const {
    fetchData,
    isLoading,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setTeacherData,
    fetchFunction: teacherService.searchAllTeachers,
    onlyActive: true,
  });

  useEffect(() => {
    fetchData("", false);
  }, []);

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
    teacherData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    handleSelectTeacher,
    handleRemoveTeacher,
  };
};
