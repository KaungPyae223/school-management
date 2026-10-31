import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import { teacherService } from "../../../../services/teachers";
import type { InfiniteData } from "@tanstack/react-query";

export const useGetTimetableSelectTeacher = (debouncedSearchTerm: string) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: ["getAllTeachers", debouncedSearchTerm],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      teacherService.searchAllTeachers({
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

  const teachers =
    (data as InfiniteData<any> | undefined)?.pages.flatMap(
      (page) => page?.data ?? [],
    ) ?? [];

  return {
    teachers,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  };
};
