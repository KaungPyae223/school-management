import type { InfiniteData } from "@tanstack/react-query";
import { useAppInfiniteQuery } from "../../../../hooks/use-app-infinite-query";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";
import { paymentService } from "../../../../services/payments";

export const useGetOutstandingPayment = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery({
    queryKey: [
      "payments",
      {
        sort: "lastPaidAt",
        direction: "desc",
      },
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      paymentService.getAllPayments({
        page: pageParam,
        limit: 10,
        sort: "lastPaidAt",
        direction: "desc",
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

  const payments =
    (data as InfiniteData<any> | undefined)?.pages.flatMap(
      (page) => page?.data ?? [],
    ) ?? [];

  return {
    payments,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  };
};
