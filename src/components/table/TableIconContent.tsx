import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const TableIconContent = ({
  icon: Icon,
  value,
  align = "left",
  className = "",
  iconClassName = "",
}: {
  icon: LucideIcon;
  value: string | number | null | undefined;
  align?: "right" | "left" | "center";
  className?: string;
  iconClassName?: string;
}) => {
  const alignment = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("flex items-center gap-1.5 w-full", alignment[align])}>
      <Icon className={cn(`h-4 w-4 text-muted-foreground/60`, iconClassName)} />
      <span className={cn(`font-medium line-clamp-1`, className)}>
        {value || "--"}
      </span>
    </div>
  );
};

export default TableIconContent;
