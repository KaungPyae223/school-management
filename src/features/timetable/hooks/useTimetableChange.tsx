import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useSetQueryParams } from "../../../hooks/use-set-query-params";

export const useTimetableChange = () => {
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

  const handleDatesSet = (dateInfo) => {
    const { start, end } = dateInfo;

    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();

    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    updateQueryParams({
      start_month: startMonth.toString(),
      start_year: startYear.toString(),
      end_month: endMonth.toString(),
      end_year: endYear.toString(),
    });
  };

  return { params, handleDatesSet };
};
