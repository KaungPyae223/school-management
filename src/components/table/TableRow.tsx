import type { ClassValue } from "cn";
import { cn } from "../../lib/utils";

interface TableRowProps {
  children: React.ReactNode;
  className?: ClassValue;
  [key: string]: any;
}

const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn("hover:bg-muted transition-colors group", className)}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
