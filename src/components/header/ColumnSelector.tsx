import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Columns } from "lucide-react";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { useGetSelectedColumns } from "../../hooks/use-get-selected-columns";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { replaceLocalDigit } from "../../utils/replace-local-digit";

interface Props {
  columns: { title: string; key: string }[];
  alwaysSelectedColumns: string[];
  defaultSelectedColumns: string[];
}

const ColumnSelector: React.FC<Props> = ({
  columns,
  alwaysSelectedColumns,
  defaultSelectedColumns,
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  const { t } = useTranslation();

  const updateQueryParams = useSetQueryParams();

  const selectedColumns = useGetSelectedColumns(defaultSelectedColumns);

  const toggleColumn = (key: string) => {
    let checkColumns: string[] = [];

    if (selectedColumns.includes(key)) {
      checkColumns = selectedColumns.filter((col) => col !== key);
    } else {
      checkColumns = [...selectedColumns, key];
    }

    updateQueryParams({
      columns: checkColumns.join(","),
    });
  };

  const selectAllColumns = () => {
    updateQueryParams({
      columns: [
        ...columns.map((column) => column.key),
        "Created At",
        "Updated At",
      ].join(","),
    });
  };

  const visibleColumnsCount = selectedColumns.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Columns className="h-4 w-4" />
          <span>{t("general.columns")}</span>
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {replaceLocalDigit(visibleColumnsCount)}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        {/* Header with count */}
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          {t("general.selectColumns")}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-1">
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.key}
              checked={selectedColumns.includes(column.key)}
              onCheckedChange={() => toggleColumn(column.key)}
              disabled={alwaysSelectedColumns.includes(column.key)}
              className="p-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">{column.title}</span>
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuCheckboxItem
            checked={selectedColumns.includes("Created At")}
            onCheckedChange={() => toggleColumn("Created At")}
            disabled={alwaysSelectedColumns.includes("Created At")}
            className="py-2 px-2 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {t("general.createdAt")}
            </span>
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            checked={selectedColumns.includes("Updated At")}
            onCheckedChange={() =>
              toggleColumn(isTrashView ? "Deleted At" : "Updated At")
            }
            disabled={alwaysSelectedColumns.includes(
              isTrashView ? "Deleted At" : "Updated At",
            )}
            className="py-2 px-2 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {isTrashView ? t("general.deletedAt") : t("general.updatedAt")}
            </span>
          </DropdownMenuCheckboxItem>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2 space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={selectAllColumns}
            >
              {t("general.selectAll")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={() => {
                updateQueryParams({
                  columns: defaultSelectedColumns.join(","),
                });
              }}
            >
              {t("general.resetDefaults")}
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
