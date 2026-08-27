import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import { cn } from "../../../../lib/utils";
import { useTranslation } from "react-i18next";

const ClassesAdvancedQueryGroup = ({
  icon,
  title,
  children,
  className,
  numberSelected,
  isSelected,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  numberSelected?: number;
  isSelected?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn("rounded-lg border bg-card p-3.5 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {icon}
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
