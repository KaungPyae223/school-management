import type { LucideIcon } from "lucide-react";

const TableIconContent = ({
  icon: Icon,
  value,
}: {
  icon: LucideIcon;
  value: string | number | null | undefined;
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-muted-foreground/60" />
      <span className="font-medium line-clamp-1">{value || "--"}</span>
    </div>
  );
};

export default TableIconContent;
