import { useNavigate } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const DashboardOutstandingPaymentCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  return (
    <div key={data.id} className="p-3 rounded-lg border">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={data.studentImage} alt={data.studentName} />
            <AvatarFallback>
              {generateImageFallBack(data.studentName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {data.courseName}
              </p>
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {data.courseName} (Batch {data.batch})
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right space-y-1">
          <p className="text-xs text-muted-foreground">Outstanding Amount</p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {replaceLocalDigit(formatCurrency(data.remainingAmount))}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-muted-foreground text-xs ">
          Last Paid Date:{" "}
          <span className="font-medium text-foreground">
            {formatDate(new Date(data.lastPaidAt))}
          </span>
        </p>

        <Button
          onClick={() => navigate(`payments/${data.id}`)}
          variant="outline"
          size="xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DashboardOutstandingPaymentCard;
