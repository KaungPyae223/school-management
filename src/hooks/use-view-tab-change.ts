import { useSearchParams } from "react-router";
import { useSetQueryParams } from "./use-set-query-params";
import { useDefaultViewStore } from "../stores/useDefaultViewStore";

export const useViewTabChange = (fallbackView?: string) => {
  const [searchParams] = useSearchParams();
  const { view: storedView } = useDefaultViewStore();

  const updateQueryParams = useSetQueryParams();
  const defaultView = fallbackView ?? storedView;

  const view = searchParams.get("tab") ?? defaultView;

  const changeView = (tab: string) => {
    updateQueryParams({ tab });
  };

  return { view, changeView };
};
