import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TableActionButton = ({
  icon: Icon,
  tooltip,
  onClick,
  variant = "outline",
  className,
}: {
  icon: LucideIcon;
  tooltip: string;
  onClick?: () => void;
  variant?: "outline" | "destructive" | "default";
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          onClick={onClick}
          className={className}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TableActionButton;
