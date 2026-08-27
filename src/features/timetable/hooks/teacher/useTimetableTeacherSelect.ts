import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { useFetchTeachersForSelect } from "../../../classes/hooks/api/useFetchTeachersForSelect";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export interface Teacher {
  id: number;
  name: string;
  image?: string;
}

export const useTimetableTeacherSelect = () => {
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();

  const selected = searchParam.get("selectedTeachers")
    ? searchParam.get("selectedTeachers")!.split(",")
    : [];

  const deSelected = searchParam.get("deSelectedTeachers");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const updateQueryParams = useSetQueryParams();

  const { fetchTeachers, setPage, isLoading, hasMore, setHasMore } =
    useFetchTeachersForSelect({
      setTeacherData,
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

  const debouncedTeacherSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchTeachers(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedTeacherSearch(searchTerm);

    return () => {
      debouncedTeacherSearch.cancel();
    };
  }, [searchTerm, debouncedTeacherSearch]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

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
    teacherData,
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
