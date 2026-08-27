import { useState } from "react";
import { teacherService } from "../../../../services/teachers";
import type { Teacher } from "../filters/useTeacherSelect";

export const useFetchTeachersForSelect = ({
  setSelectedTeachers,
  setTeacherData,
  onlyActive = false,
}: {
  setSelectedTeachers?: React.Dispatch<React.SetStateAction<Teacher[]>>;
  setTeacherData: React.Dispatch<React.SetStateAction<Teacher[]>>;
  onlyActive?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchTeachers = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await teacherService.searchAllTeachers({
        search: value,
        page,
        limit: 5,
        onlyActive,
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

  const fetchSelectedTeachers = async (teacherIds: number[]) => {
    try {
      const response = await teacherService.searchAllTeachers({ teacherIds });
      const results: Teacher[] = response?.data ?? [];
      setSelectedTeachers(results);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchTeachers,
    fetchSelectedTeachers,
    isLoading,
    hasMore,
    setPage,
    setHasMore,
  };
};
