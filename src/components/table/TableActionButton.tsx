import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TableActionButton = ({
  icon,
  tooltip,
  onClick,
  variant = "outline",
  className,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
  variant?: "outline" | "destructive" | "default";
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size="icon" onClick={onClick} className={className}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TableActionButton;
