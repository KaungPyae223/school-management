import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useAppQuery = (options: UseQueryOptions) => {
  const navigate = useNavigate();

  return useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
    throwOnError: (error: Error) => {
      if (error.message === "UNAUTHORIZED") {
        navigate("/login", { replace: true });
        return false;
      }
      return false;
    },
  });
};
