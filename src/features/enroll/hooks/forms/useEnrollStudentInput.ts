import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import type { ControllerRenderProps } from "react-hook-form";
import { studentService } from "../../../../services/students";

export interface Student {
  id: string;
  name: string;
  image?: string;
}

export const useEnrollStudentInput = (
  field: ControllerRenderProps<any, "studentId">
) => {
  const studentValue = field.value;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showStudentDropDown, setShowStudentDropDown] =
    useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchStudents = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await studentService.searchAllStudents({
        search: value,
        page,
        limit: 5,
      });
      const results: Student[] = response?.data ?? [];
      setStudentData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents("", false);
  }, []);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !isLoading &&
          studentData.length > 0
        ) {
          fetchStudents(searchTerm);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, searchTerm, isLoading, studentData.length]);

  const debouncedStudentSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchStudents(value, false);
      }, 750),
    []
  );

  useEffect(() => {
    debouncedStudentSearch(searchTerm);

    return () => {
      debouncedStudentSearch.cancel();
    };
  }, [searchTerm, debouncedStudentSearch]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSelectStudent = (student: Student) => {
    field.onChange(student.id);
    setSelectedStudent(student);
    setShowStudentDropDown(false);
    setSearchTerm("");
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
