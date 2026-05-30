import { Calendar, CalendarClock } from "lucide-react";
import { CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { formatDate } from "../../utils/format-date";

const CardCretedUpdated = ({
  createdAt,
  updatedAt,
}: {
  createdAt: Date;
  updatedAt?: Date;
}) => {
  return (
    <CardContent>
      <Separator className="mb-4" />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs  uppercase tracking-wide text-muted-foreground font-medium">
            <Calendar className="h-3 w-3" />
            Created Date
          </span>
          <Badge variant="secondary" className="text-xs font-medium">
            {formatDate(createdAt)}
          </Badge>
        </div>

        {updatedAt && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">
              <CalendarClock className="h-3 w-3" />
              Last updated
            </span>
            <Badge
              variant="secondary"
              className="text-xs font-medium text-blue-700 dark:text-blue-300"
            >
              {formatDate(updatedAt)}
            </Badge>
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default CardCretedUpdated;
