import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { replaceLocalDigit } from "../../utils/replace-local-digit";

const CardMeta = ({
  icon: Icon,
  title,
  value,
  className,
}: {
  icon: LucideIcon;
  title: string;
  value: string | number;
  className?: string;
}) => {
  return (
    <div className="flex items-center w-full justify-between bg-muted rounded-lg px-3 py-2">
      <div className="flex items-center gap-2.5">
        <div className={cn("p-1.5 rounded-md", className)}>
          <Icon size={14} />
        </div>
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <span className="text-sm font-medium">{replaceLocalDigit(value)}</span>
    </div>
  );
};

export default CardMeta;
