interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  [key: string]: unknown;
}

const TableCell = ({
  children,
  className,
  align = "left",
  ...props
}: TableCellProps) => {
  const alignmentClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "";
  return (
    <td
      className={`first:pl-6 last:pr-6 px-3 py-4 transition-colors ${alignmentClass} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
