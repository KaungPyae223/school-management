import { useSearchParams } from "react-router";

export const useFilterData = ({
  selectedParam,
  deSelectedParam,
  idField,
}: {
  selectedParam: string;
  deSelectedParam: string;
  idField: string;
}) => {
  const [searchParam] = useSearchParams();

  const selected = searchParam.get(selectedParam)
    ? searchParam.get(selectedParam).split(",")
    : [];

  const deSelected = searchParam.get(deSelectedParam);

  const filteredData = (data: any[]) => {
    if (selected.length == 0 && !deSelected) {
      return data;
    } else if (deSelected) {
      return data?.filter((item) =>
        selected.includes(item.extendedProps[idField].toString()),
      );
    } else {
      return data?.filter(
        (item) => !selected.includes(item.extendedProps[idField].toString()),
      );
    }
  };

  return { filteredData };
};
