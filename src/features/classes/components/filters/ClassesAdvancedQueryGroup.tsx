import { type LucideIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import { cn } from "../../../../lib/utils";
import { useTranslation } from "react-i18next";

const ClassesAdvancedQueryGroup = ({
  icon: Icon,
  title,
  children,
  className,
  numberSelected,
  isSelected,
  dataTour,
}: {
  icon?: LucideIcon;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  numberSelected?: number;
  isSelected?: boolean;
  dataTour?: string;
}) => {
  const { t } = useTranslation();

  return (
    <div
      data-tour={dataTour}
      className={cn("rounded-lg border bg-card p-3.5 space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Icon className="size-3.5 text-primary" />
          {title}
        </Label>
        {isSelected && (
          <Badge
            variant="secondary"
            className="px-2 py-0 text-muted-foreground"
          >
            {numberSelected} {t("classes.advancedQuery.selected")}
          </Badge>
        )}
      </div>
      {children}
    </div>
  );
};

export default ClassesAdvancedQueryGroup;
