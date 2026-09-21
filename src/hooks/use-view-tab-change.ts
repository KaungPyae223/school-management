import { useSearchParams } from "react-router";
import { useSetQueryParams } from "./use-set-query-params";
import { useDefaultViewStore } from "../stores/useDefaultViewStore";
import { useEffect, useState } from "react";

export const useViewTabChange = (fallbackView?: string) => {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<string | null>(null);
  const { view: storedView } = useDefaultViewStore();

  const updateQueryParams = useSetQueryParams();
  const defaultView = fallbackView ?? storedView;

  useEffect(() => {
    setView(searchParams.get("tab") ?? defaultView);
  }, []);

  const changeView = (tab: string) => {
    setView(tab);
    updateQueryParams({ tab });
  };

  return { view, changeView };
};
