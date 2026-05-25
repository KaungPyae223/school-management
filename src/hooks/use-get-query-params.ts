import { useSearchParams } from "react-router";

export const useGetQueryParams = () => {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const numberParams = ["page", "limit"];

  return {
    activeParams: params.toString(),
    activeQueryParams: Object.fromEntries(
      Array.from(params).map(([key, value]) => {
        if (numberParams.includes(key)) {
          return [key, Number(value)];
        }
        if (key === "isTerminated") {
          return [key, value === "true"];
        }
        return [key, value];
      }),
    ),
  };
};
