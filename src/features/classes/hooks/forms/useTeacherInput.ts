import { useEffect, useMemo, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { useFetchTeachersForSelect } from "../api/useFetchTeachersForSelect";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useTeacherInput = (
  field: ControllerRenderProps<any, "teacherId">,
  defaultSelectedTeacher?: Teacher,
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const { fetchTeachers, setPage, isLoading, hasMore, setHasMore } =
    useFetchTeachersForSelect({
      setTeacherData,
      onlyActive: true,
    });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchFunction: fetchTeachers,
    searchTerm,
  });

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
