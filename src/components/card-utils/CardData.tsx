import React from "react";
import { cn } from "../../lib/utils";
import { replaceLocalDigit } from "../../utils/replace-local-digit";

const CardData = ({
  icon,
  label,
  value,
  iconBg,
  border = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
  border?: boolean;
}) => {
  return (
    <div
      className={cn(
        `flex items-center gap-2.5 p-2 rounded-lg bg-muted/50`,
        border && "border border-border",
      )}
    >
      <div className={cn("p-1.5 rounded-md", iconBg)}>{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xs font-medium">{replaceLocalDigit(value)}</p>
      </div>
    </div>
  );
};

export default CardData;
