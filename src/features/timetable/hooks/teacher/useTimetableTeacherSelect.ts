import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";
import { useGetTimetableSelectTeacher } from "../api/useGetTimetableSelectTeacher";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useTimetableTeacherSelect = () => {
  const [searchParam] = useSearchParams();

  const selected = searchParam.get("selectedTeachers")
    ? searchParam.get("selectedTeachers")!.split(",")
    : [];

  const deSelected = searchParam.get("deSelectedTeachers");

  const updateQueryParams = useSetQueryParams();

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    teachers,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTimetableSelectTeacher(debouncedSearchTerm);

  const toggleColumn = (id: string) => {
    const newSelect = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    updateQueryParams({
      selectedTeachers: newSelect.join(","),
    });
  };

  const selectAllFiltered = () => {
    updateQueryParams({
      selectedTeachers: null,
      deSelectedTeachers: null,
    });
  };

  const deselectAllFiltered = () => {
    updateQueryParams({
      deSelectedTeachers: true,
      selectedTeachers: null,
    });
  };

  const checkSelect = (id: string): boolean => {
    if (selected.length === 0 && !deSelected) {
      return true;
    } else if (deSelected) {
      return selected.includes(id);
    } else {
      return !selected.includes(id);
    }
  };

  return {
    searchTerm,
    teachers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    loadingRef,
    handleSearchChange,
    toggleColumn,
    selectAllFiltered,
    deselectAllFiltered,
    checkSelect,
  };
};
