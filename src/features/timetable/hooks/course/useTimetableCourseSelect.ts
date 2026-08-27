import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useFetchOnScroll } from "../../../../hooks/use-fetch-on-scroll";
import { courseService } from "../../../../services/courses";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";

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

  const [courseData, setCourseData] = useState<Course[]>([]);

  const updateQueryParams = useSetQueryParams();

  const {
    isLoading,
    hasMore,
    fetchData,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setCourseData,
    fetchFunction: courseService.searchAllCourses,
  });

  useEffect(() => {
    fetchData("", false);
  }, []);

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
