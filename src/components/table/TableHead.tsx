import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { AnimatePresence, m } from "framer-motion";

interface TableHeadProps {
  className?: string;
  sortKey?: string;
  children: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  hidden?: boolean;
  [key: string]: unknown;
}

const TableHead = ({
  className,
  children,
  sortable = false,
  sortKey,
  align = "left",
  hidden = false,
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

  const handleSort = () => {
    const newSortDirection =
      sort === sortKey ? (sortDirection === "asc" ? "desc" : "asc") : "asc";

    updateQueryParams({
      sort: sortKey,
      sortDirection: newSortDirection,
      page: 1,
    });
  };

  const isSorted = sort === sortKey;

  const sortIcon = isSorted ? (
    sortDirection === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
    )
  ) : (
    <ArrowUpDown className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70" />
  );

  return (
    <AnimatePresence mode="sync" initial={false}>
      {!hidden && (
        <m.th
          className={`first:pl-6 last:pr-6 lg:table-cell px-3 py-3.5 ${alignmentClass} font-semibold text-muted-foreground ${className} `}
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            onClick={() => sortable && handleSort()}
            className={`flex items-center gap-2 ${alignmentClass} ${sortable ? "cursor-pointer" : ""}`}
          >
            {children}
            {sortable && sortIcon}
          </div>
        </m.th>
      )}
    </AnimatePresence>
  );
};

export default TableHead;
