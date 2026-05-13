import { ArrowDown,  ArrowUp, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../hooks/use-set-query-params";

interface TableHeadProps {
  className?: string;
  children: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  [key: string]: unknown;
}

const TableHead = ({
  className,
  children,
  sortable = false,
  align = "left",
  ...props
}: TableHeadProps) => {
  const alignmentClass =
    align === "right"
      ? "justify-end"
      : align === "center"
        ? "justify-center"
        : "";

  const [searchParams] = useSearchParams();
  const updateQueryParams = useSetQueryParams();

  const sort = searchParams.get("sort");
  const sortDirection = searchParams.get("sortDirection");

  const handleSort = (column: string) => {
    const newSortDirection =
      sort === column ? (sortDirection === "asc" ? "desc" : "asc") : "asc";

    updateQueryParams({
      sort: column,
      sortDirection: newSortDirection,
    });
  };

  const isSorted = sort === String(children);

  const sortIcon = isSorted ? (
    sortDirection === "asc" ? (
      <ArrowDown className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
    ) : (
      <ArrowUp className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
    )
  ) : (
    <ArrowUpDown className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
  );

  return (
    <th
      className={`hidden first:pl-6 last:pr-6 lg:table-cell px-3 py-3.5 ${alignmentClass} font-semibold text-muted-foreground ${className}`}
      {...props}
    >
      <div
        onClick={() => sortable && handleSort(String(children))}
        className={`flex items-center gap-2 ${alignmentClass} ${sortable ? "cursor-pointer" : ""}`}
      >
        {children}
        {sortable && sortIcon}
      </div>
    </th>
  );
};

export default TableHead;
