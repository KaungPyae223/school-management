import { AnimatePresence, m } from "framer-motion";
import { cn } from "../../lib/utils";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  hidden?: boolean;
  [key: string]: unknown;
}

const TableCell = ({
  children,
  className,
  align = "left",
  hidden = false,
  ...props
}: TableCellProps) => {
  const alignmentClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "";

  return (
    <AnimatePresence mode="sync" initial={false}>
      {!hidden && (
        <m.td
          className={cn(
            "first:pl-6 last:pr-6 px-3 py-4 transition-colors",
            alignmentClass,
            className,
          )}
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </m.td>
      )}
    </AnimatePresence>
  );
};

export default TableCell;
