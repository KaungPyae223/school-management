import { Trophy } from "lucide-react";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { formatCurrency } from "../../../../utils/format-currency";
import { cn } from "../../../../lib/utils";
import type { TopClass } from "../../data/analysis-dummy";

const rankStyle = [
  "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  "bg-slate-200 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
];

const TopClassesCard = ({ data }: { data: TopClass[] }) => {
  return (
    <DashboardCard
      title="Top Classes by Revenue"
      description="Best performing batches this period"
      action={<Trophy className="h-4 w-4 text-muted-foreground" />}
    >
      <CardContent className="p-0 flex-1">
        {data.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center justify-between gap-3 px-1 py-2.5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums",
                    rankStyle[index] ?? "bg-muted text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {item.course}{" "}
                    <span className="text-muted-foreground">
                      · Batch {item.batch}
                    </span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.teacher} · {item.days}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold tabular-nums">
                  {formatCurrency(item.revenue)}
                </p>
                <p className="text-[11px] text-muted-foreground tabular-nums">
                  {item.students} students
                </p>
              </div>
            </div>
            {index < data.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </DashboardCard>
  );
};

export default TopClassesCard;
