import { useState } from "react";

export const useFetchOnScroll = ({
  setSelectedData,
  setData,
  onlyActive = false,
  fetchFunction,
}: {
  setSelectedData?: React.Dispatch<React.SetStateAction<any[]>>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  onlyActive?: boolean;
  fetchFunction: (value: any) => Promise<any>;
}) => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await fetchFunction({
        search: value,
        page,
        limit: 10,
        onlyActive,
      });
      const results: any[] = response?.data ?? [];
      setData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 10);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSelectedData = async (value: any) => {
    try {
      const response = await fetchFunction(value);
      const results: any[] = response?.data ?? [];
      setSelectedData(results);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchData,
    fetchSelectedData,
    isLoading,
    hasMore,
    setPage,
    setHasMore,
  };
};
