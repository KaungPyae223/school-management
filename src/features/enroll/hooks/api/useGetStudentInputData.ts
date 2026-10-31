import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import { studentService } from "../../../../services/students";
import type { InfiniteData } from "@tanstack/react-query";

export const useGetStudentInputData = (debouncedSearchTerm: string) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: ["getAllStudents", debouncedSearchTerm],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      studentService.searchAllStudents({
        search: debouncedSearchTerm,
        page: pageParam as number,
        limit: 10,
      }),

    getNextPageParam: (lastPage: any, pages) => {
      const results = lastPage?.data ?? [];

      return results.length === 10 ? pages.length + 1 : undefined;
    },
  });

  const loadingRef = useScrollFetch({
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
    fetchData: fetchNextPage,
  });

  const students =
    (data as InfiniteData<any> | undefined)?.pages.flatMap(
      (page) => page?.data ?? [],
    ) ?? [];

  return {
    students,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  };
};
