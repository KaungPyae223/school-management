import { cn } from "../../lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const DashboardCard = ({
  title,
  description,
  action,
  icon: Icon,
  children,
  className,
  dataTour,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
  dataTour?: string;
}) => {
  return (
    <Card className={cn("shadow-xs", className)} data-tour={dataTour}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        {action ??
          (Icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Icon className="h-4.5 w-4.5" />
            </div>
          ))}
      </CardHeader>
      {children}
    </Card>
  );
};

export default DashboardCard;
