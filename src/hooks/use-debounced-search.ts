import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export const useDebouncedSearch = ({
  setPage,
  setHasMore,
  fetchData,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (value: any, append: boolean) => Promise<any>;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchData(value, false);
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

  return {
    handleSearchChange,
    searchTerm,
    
  };
};
