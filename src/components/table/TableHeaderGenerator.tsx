import TableHeader from "./TableHeader";
import TableHead from "./TableHead";
import type { TableHeadType } from "../../types/TableHeader";
import { useSearchParams } from "react-router";

const TableHeaderGenerator = ({
  headers,
  selectedColumns = [],
  prefix = "",
}: {
  headers: TableHeadType[];
  selectedColumns: string[];
  prefix?: string;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  return (
    <TableHeader>
      {headers.map((header: TableHeadType) => (
        <TableHead
          key={header.key}
          align={header.align}
          sortable={header.sortable}
          sortKey={header.sortKey}
          hidden={!selectedColumns.includes(header.title)}
        >
          {header.title}
        </TableHead>
      ))}
      <TableHead
        key="created-at"
        sortable={true}
        sortKey={`${prefix}createdAt`}
        hidden={!selectedColumns.includes("Created At")}
      >
        Created At
      </TableHead>
      <TableHead
        key="updated-at"
        sortable={true}
        sortKey={`${prefix}updatedAt`}
        hidden={!selectedColumns.includes("Updated At")}
      >
        {isTrashView ? "Deleted At" : "Updated At"}
      </TableHead>
      <TableHead align="right">Actions</TableHead>
    </TableHeader>
  );
};

export default TableHeaderGenerator;
