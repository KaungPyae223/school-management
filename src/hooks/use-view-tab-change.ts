import { useSearchParams } from "react-router";
import { useSetQueryParams } from "./use-set-query-params";

export const useViewTabChange = (defaultView: string = "grid") => {
  const [searchParams] = useSearchParams();

  const updateQueryParams = useSetQueryParams();

  const view = searchParams.get("tab") ?? defaultView;

  const changeView = (tab: string) => {
    updateQueryParams({ tab });
  };

  return { view, changeView };
};
