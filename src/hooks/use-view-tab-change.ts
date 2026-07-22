import { useSearchParams } from "react-router";
import { useSetQueryParams } from "./use-set-query-params";

export const useViewTabChange = (defaultView: string = "grid") => {
  const [searchParams] = useSearchParams();

  const updateQueryParams = useSetQueryParams();

  const view = searchParams.get("view") ?? defaultView;

  const changeView = (view: string) => {
    updateQueryParams({ view });
  };

  return { view, changeView };
};
