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

interface Props {
  columns: string[];
  alwaysSelectedColumns: string[];
  selectedColumns: string[];
  setSelectedColumns: (columns: string[]) => void;
}

const ColumnSelector: React.FC<Props> = ({
  columns,
  alwaysSelectedColumns,
  selectedColumns,
  setSelectedColumns,
}) => {
  const toggleColumn = (title: string) => {
    const isExist = selectedColumns.includes(title);

    if (isExist) {
      setSelectedColumns(selectedColumns.filter((col) => col !== title));
    } else {
      setSelectedColumns([...selectedColumns, title]);
    }
  };

  const selectAllColumns = () => {
    setSelectedColumns(columns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns /> Columns ( {selectedColumns.length} )
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={selectAllColumns}>
          Select All
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
