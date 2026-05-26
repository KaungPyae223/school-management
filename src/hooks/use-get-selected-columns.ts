import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useGetSelectedColumns = (defaultCheckedColumns: string[]): string[] => {
  const [searchParams] = useSearchParams();

  const [checkedColumns, setCheckedColumns] = useState<string[]>(
    defaultCheckedColumns,
  );

  useEffect(() => {
    const checkedColumns = searchParams.get("columns")?.split(",") || [];

    if (checkedColumns.length === 0) {
      setCheckedColumns(defaultCheckedColumns);
    } else {
      setCheckedColumns(checkedColumns);
    }
  }, [searchParams.get("columns")]);

  return checkedColumns;
};
