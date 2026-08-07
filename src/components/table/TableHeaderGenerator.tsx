import TableHeader from "./TableHeader";
import TableHead from "./TableHead";
import type { TableHeadType } from "../../types/TableHeader";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <TableHeader>
      {headers.map((header: TableHeadType) => (
        <TableHead
          key={header.key}
          align={header.align}
          sortable={header.sortable}
          sortKey={header.sortKey}
          hidden={!selectedColumns.includes(header.key)}
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
        {t("general.createdAt")}
      </TableHead>
      <TableHead
        key="updated-at"
        sortable={true}
        sortKey={`${prefix}updatedAt`}
        hidden={!selectedColumns.includes("Updated At")}
      >
        {isTrashView ? t("general.deletedAt") : t("general.updatedAt")}
      </TableHead>
      <TableHead align="right">{t("general.actions")}</TableHead>
    </TableHeader>
  );
};

export default TableHeaderGenerator;
