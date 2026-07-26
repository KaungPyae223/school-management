import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useSetQueryParams } from "../../../hooks/use-set-query-params";

export const useTimetableChange = (view?: string) => {
  const { activeQueryParams } = useGetQueryParams();
  const updateQueryParams = useSetQueryParams();

  const today = new Date();
  const params = {
    start_month: activeQueryParams.start_month
      ? activeQueryParams.start_month
      : (today.getMonth() + 1).toString(),
    start_year: activeQueryParams.start_year
      ? activeQueryParams.start_year
      : today.getFullYear().toString(),
    end_month: activeQueryParams.end_month
      ? activeQueryParams.end_month
      : (today.getMonth() + 1).toString(),
    end_year: activeQueryParams.end_year
      ? activeQueryParams.end_year
      : today.getFullYear().toString(),
  };

  const initialDate = activeQueryParams.initialDate
    ? activeQueryParams.initialDate
    : today.toISOString();

  const initialView = activeQueryParams.calendar_view
    ? activeQueryParams.calendar_view
    : view;


  const handleDatesSet = (dateInfo) => {
    const { start, end, startStr, view } = dateInfo;

    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();

    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    updateQueryParams({
      start_month: startMonth.toString(),
      start_year: startYear.toString(),
      end_month: endMonth.toString(),
      end_year: endYear.toString(),
      initialDate: startStr,
      calendar_view: view.type,
    });
  };

  return { params, handleDatesSet, initialDate, initialView };
};
