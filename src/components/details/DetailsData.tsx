import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const DetailsData = ({
  icon: Icon,
  label,
  children,
  className,
  border = true,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) => {
  return (
    <div
      className={cn("space-y-2 p-3", border && "border rounded-md", className)}
    >
      <div className="flex items-center text-sm gap-1.5 text-muted-foreground">
        <Icon size={13} />
        {label}
      </div>
      {children}
    </div>
  );
};

export default DetailsData;
