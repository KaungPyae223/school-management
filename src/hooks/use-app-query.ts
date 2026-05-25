import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useAppQuery = (options: UseQueryOptions) => {
  return useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
};
