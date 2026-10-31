import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import { courseService } from "../../../../services/courses";
import type { InfiniteData } from "@tanstack/react-query";

export const useGetTimetableSelectCourse = (debouncedSearchTerm: string) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: ["getAllCourses", debouncedSearchTerm],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      courseService.searchAllCourses({
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

  const courses =
    (data as InfiniteData<any> | undefined)?.pages.flatMap(
      (page) => page?.data ?? [],
    ) ?? [];

  return {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  };
};
