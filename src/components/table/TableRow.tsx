import { cn } from "../../lib/utils";

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr className={cn("hover:bg-muted transition-colors group", className)}>
      {children}
    </tr>
  );
};

export default TableRow;
