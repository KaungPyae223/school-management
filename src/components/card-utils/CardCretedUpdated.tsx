import { Calendar, CalendarClock, Trash2 } from "lucide-react";
import { CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { formatDate } from "../../utils/format-date";
import { useSearchParams } from "react-router";

const CardCretedUpdated = ({
  createdAt,
  updatedAt,
}: {
  createdAt: Date;
  updatedAt?: Date;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

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
            <span
              className={`flex items-center gap-1.5 text-xs uppercase tracking-wide ${
                isTrashView ? "text-red-600" : "text-muted-foreground"
              } font-medium`}
            >
              {isTrashView ? (
                <Trash2 className="h-3 w-3" />
              ) : (
                <CalendarClock className="h-3 w-3" />
              )}
              {isTrashView ? "Deleted Date" : "Last updated"}
            </span>
            <Badge
              variant="secondary"
              className={`text-xs font-medium ${
                isTrashView
                  ? "text-red-600 dark:text-red-400"
                  : "text-blue-700 dark:text-blue-300"
              }`}
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
