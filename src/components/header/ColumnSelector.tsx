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

interface Props {
  columns: string[];
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

  const updateQueryParams = useSetQueryParams();

  const selectedColumns = useGetSelectedColumns(defaultSelectedColumns);

  const toggleColumn = (title: string) => {
    let checkColumns: string[] = [];

    if (selectedColumns.includes(title)) {
      checkColumns = selectedColumns.filter((col) => col !== title);
    } else {
      checkColumns = [...selectedColumns, title];
    }

    updateQueryParams({
      columns: checkColumns.join(","),
    });
  };

  const selectAllColumns = () => {
    updateQueryParams({
      columns: [...columns, "Created At", "Updated At"].join(","),
    });
  };

  const visibleColumnsCount = selectedColumns.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Columns className="h-4 w-4" />
          <span>Columns</span>
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {visibleColumnsCount}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        {/* Header with count */}
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          Select Columns
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-1">
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column}
              checked={selectedColumns.includes(column)}
              onCheckedChange={() => toggleColumn(column)}
              disabled={alwaysSelectedColumns.includes(column)}
              className="p-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">{column}</span>
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuCheckboxItem
            checked={selectedColumns.includes("Created At")}
            onCheckedChange={() => toggleColumn("Created At")}
            disabled={alwaysSelectedColumns.includes("Created At")}
            className="py-2 px-2 cursor-pointer"
          >
            <span className="flex items-center gap-2">Created At</span>
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
              {isTrashView ? "Deleted At" : "Updated At"}
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
              Select All
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
              Reset Defaults
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
