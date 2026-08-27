import { useDebouncedSearch } from "./use-debounced-search";
import { useFetchOnScroll } from "./use-fetch-on-scroll";
import { useScrollFetch } from "./use-scroll-fetch";

export const useGetFilterData = ({
  setData,
  setSelectedData,
  fetchFunction,
  onlyActive = false,
}: {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedData?: React.Dispatch<React.SetStateAction<any[]>>;
  fetchFunction: (value: any) => Promise<any>;
  onlyActive?: boolean;
}) => {
  const {
    fetchData,
    fetchSelectedData,
    isLoading,
    hasMore,
    setPage,
    setHasMore,
  } = useFetchOnScroll({
    setSelectedData,
    setData,
    fetchFunction,
    onlyActive,
  });

  const { handleSearchChange, searchTerm } = useDebouncedSearch({
    setPage,
    setHasMore,
    fetchData,
  });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchData,
    searchTerm,
  });

  return {
    fetchData,
    fetchSelectedData,
    isLoading,
    hasMore,
    setPage,
    handleSearchChange,
    searchTerm,
    loadingRef,
  };
};
