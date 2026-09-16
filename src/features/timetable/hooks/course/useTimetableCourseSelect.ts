import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { useGetTimetableSelectCourse } from "../api/useGetTimetableSelectCourse";
import { useDebouncedSearch } from "../../../../hooks/use-debounced-search";

export interface Course {
  id: number;
  name: string;
  image?: string;
  price?: string;
}

export const useTimetableCourseSelect = () => {
  const [searchParam] = useSearchParams();

  const selected = searchParam.get("selectedCourses")
    ? searchParam.get("selectedCourses")!.split(",")
    : [];

  const deSelected = searchParam.get("deSelectedCourses");

  const updateQueryParams = useSetQueryParams();

  const { handleSearchChange, debouncedSearchTerm, searchTerm } =
    useDebouncedSearch();

  const {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTimetableSelectCourse(debouncedSearchTerm);

  const toggleColumn = (id: string) => {
    const newSelect = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    updateQueryParams({
      selectedCourses: newSelect.join(","),
    });
  };

  const selectAllFiltered = () => {
    updateQueryParams({
      selectedCourses: null,
      deSelectedCourses: null,
    });
  };

  const deselectAllFiltered = () => {
    updateQueryParams({
      deSelectedCourses: true,
      selectedCourses: null,
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
    courses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    error,
    handleSearchChange,
    toggleColumn,
    selectAllFiltered,
    deselectAllFiltered,
    checkSelect,
  };
};
