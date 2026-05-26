import { useSearchParams } from "react-router";
import { useSetQueryParams } from "./use-set-query-params";

export const useViewTabChange = () => {
  const [searchParams] = useSearchParams();

  const updateQueryParams = useSetQueryParams();

  const view = searchParams.get("view") ?? "grid";

  const changeView = (view: string) => {
    updateQueryParams({ view });
  };

  return { view, changeView };
};
