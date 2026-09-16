import {
  keepPreviousData,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { useNavigate } from "react-router";

export const useAppInfiniteQuery = (options: UseInfiniteQueryOptions) => {
  const navigate = useNavigate();

  return useInfiniteQuery({
    retry: 1,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: keepPreviousData,

    ...options,

    throwOnError: (error: Error) => {
      if (error.message === "UNAUTHORIZED") {
        navigate("/login", { replace: true });
      }

      return false;
    },
  });
};
