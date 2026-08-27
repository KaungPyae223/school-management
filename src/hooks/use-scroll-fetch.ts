import { useEffect, useRef } from "react";

export const useScrollFetch = ({
  hasMore,
  isLoading,
  fetchData,
  searchTerm,
}: {
  hasMore: boolean;
  isLoading: boolean;
  fetchData: (s: string, c: boolean) => void;
  searchTerm: string;
}) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    if (!currentLoadingRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchData(searchTerm, true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(currentLoadingRef);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return loadingRef;
};
