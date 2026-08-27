import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSetQueryParams } from "../../../../hooks/use-set-query-params";
import { teacherService } from "../../../../services/teachers";
import { useGetFilterData } from "../../../../hooks/use-get-filter-data";

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

  const [teacherData, setTeacherData] = useState<Teacher[]>([]);

  const updateQueryParams = useSetQueryParams();

  const {
    isLoading,
    fetchData,
    hasMore,
    handleSearchChange,
    searchTerm,
    loadingRef,
  } = useGetFilterData({
    setData: setTeacherData,
    fetchFunction: teacherService.searchAllTeachers,
  });

  useEffect(() => {
    fetchData("", false);
  }, []);

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
