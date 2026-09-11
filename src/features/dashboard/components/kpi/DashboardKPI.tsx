import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { cn } from "../../../../lib/utils";

const DashboardKPI = ({
  title,
  icon: Icon,
  statistics,
  iconBg,
  children,
}: {
  title: string;
  icon: LucideIcon;
  statistics: string | React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight">
          {statistics}
        </div>
        <Separator className="my-3" />
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardKPI;
