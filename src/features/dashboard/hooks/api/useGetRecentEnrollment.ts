import { useEffect, useState } from "react";
import { useFetchOnScroll } from "../../../../hooks/use-fetch-on-scroll";
import { dashboardService } from "../../../../services/dashboard";
import { useScrollFetch } from "../../../../hooks/use-scroll-fetch";

export const useGetRecentEnrollment = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const { fetchData, isLoading, hasMore } = useFetchOnScroll({
    setData,
    fetchFunction: dashboardService.getRecentEnrollment,
  });

  const loadingRef = useScrollFetch({
    hasMore,
    isLoading,
    fetchData,
  });

  useEffect(() => {
    fetchData("", false);
    setInitialLoading(false);
  }, []);

  return { data, initialLoading, loadingRef, hasMore, isLoading };
};
