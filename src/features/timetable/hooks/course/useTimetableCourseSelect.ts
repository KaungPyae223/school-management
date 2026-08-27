import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { useFetchCoursesForSelect } from "../../../classes/hooks/api/useFetchCoursesForSelect";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export interface Course {
  id: number;
  name: string;
  image?: string;
  price?: string;
}

export const useTimetableCourseSelect = () => {
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();

  const selected = searchParam.get("selectedCourses")
    ? searchParam.get("selectedCourses")!.split(",")
    : [];

  const deSelected = searchParam.get("deSelectedCourses");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseData, setCourseData] = useState<Course[]>([]);

  const updateQueryParams = useSetQueryParams();

  const { fetchCourses, setPage, isLoading, hasMore, setHasMore } =
    useFetchCoursesForSelect({
      setCourseData,
    });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchFunction: fetchCourses,
    searchTerm,
  });

  useEffect(() => {
    fetchCourses("", false);
  }, []);

  const debouncedCourseSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchCourses(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedCourseSearch(searchTerm);

    return () => {
      debouncedCourseSearch.cancel();
    };
  }, [searchTerm, debouncedCourseSearch]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

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
    courseData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    toggleColumn,
    selectAllFiltered,
    deselectAllFiltered,
    checkSelect,
    t,
  };
};
