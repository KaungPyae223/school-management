import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import { courseService } from "../../../../services/courses";

export const useGetCourseInputData = (
  debouncedSearchTerm: string,
  onlyActive = false,
) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: ["getAllCourses", onlyActive, debouncedSearchTerm],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      courseService.searchAllCourses({
        search: debouncedSearchTerm,
        onlyActive,
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

  const courses = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

  return {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  };
};
