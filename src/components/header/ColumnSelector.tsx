import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const isTrashView = searchParams.get("trash") === "true";

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
      columns: columns.join(","),
    });
  };

  const visibleColumnsCount = selectedColumns.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns /> Columns ( {visibleColumnsCount} )
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column}
            checked={selectedColumns.includes(column)}
            onCheckedChange={() => toggleColumn(column)}
            disabled={alwaysSelectedColumns.includes(column)}
          >
            {column}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuCheckboxItem
          checked={selectedColumns.includes("Created At")}
          onCheckedChange={() => toggleColumn("Created At")}
          disabled={alwaysSelectedColumns.includes("Created At")}
        >
          Created At
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedColumns.includes("Updated At")}
          onCheckedChange={() => toggleColumn("Updated At")}
          disabled={alwaysSelectedColumns.includes("Updated At")}
        >
          {isTrashView ? "Deleted At" : "Updated At"}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={selectAllColumns}>
          Select All
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
