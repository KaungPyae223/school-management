import { dashboardService } from "../../../../services/dashboard";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import type { InfiniteData } from "@tanstack/react-query";

export const useGetRecentPayment = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: ["getRecentPayment"],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      dashboardService.getRecentPayment({
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
    isLoading,
    fetchData: fetchNextPage,
  });

  const payments =
    (data as InfiniteData<any> | undefined)?.pages.flatMap(
      (page) => page?.data ?? [],
    ) ?? [];

  return {
    data,
    isLoading,
    loadingRef,
    hasNextPage,
    isFetchingNextPage,
    error,
    payments,
  };
};
