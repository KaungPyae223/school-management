import { useSearchParams } from "react-router";

export const useSetQueryParams = () => {
  const [_, setSearchParams] = useSearchParams();

  const updateQueryParams = (
    newParams: Record<string, string | number | boolean | null | undefined>,
  ) => {
    setSearchParams(
      (prev) => {
        const updated = new URLSearchParams(prev);

        Object.entries(newParams).forEach(([key, value]) => {
          if (
            value === null ||
            value === undefined ||
            value === "" ||
            value === 0 ||
            value === false
          ) {
            updated.delete(key);
          } else {
            updated.set(key, String(value));
          }
        });

        return updated;
      },
      {
        replace: true,
        preventScrollReset: true,
      },
    );
  };

  return updateQueryParams;
};
