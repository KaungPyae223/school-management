import { cn } from "../../lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DashboardCard = ({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn("shadow-xs", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        {action}
      </CardHeader>
      {children}
    </Card>
  );
};

export default DashboardCard;
