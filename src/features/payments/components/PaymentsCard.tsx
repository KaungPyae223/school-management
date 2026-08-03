import {
  CalendarDays,
  WalletCards,
  CreditCard,
  StickyNote,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { formatCurrency } from "../../../utils/format-currency";
import { Badge } from "../../../components/ui/badge";
import { formatDate } from "../../../utils/format-date";
import DetailsData from "../../../components/details/DetailsData";

const PaymentsCard = ({
  description,
  amountPaid,
  amountDue,
  remainingAmount,
  date,
  receipt,
  index,
}: {
  description: string;
  amountPaid: number;
  amountDue: number;
  remainingAmount: number;
  date: Date;
  receipt?: string;
  index: number;
}) => {
  return (
    <Card className="mx-auto w-full overflow-hidden shadow-sm sm:max-w-lg">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Payment Details</CardTitle>
          <Badge variant="outline" className="px-3 py-1">
            # {index}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 ">
        {description && (
          <DetailsData icon={StickyNote} label={"Description"}>
            <p className="font-medium">{description}</p>
          </DetailsData>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <DetailsData icon={CalendarDays} label={"Payment date"}>
            <p className="font-medium">{formatDate(date)}</p>
          </DetailsData>
          <DetailsData icon={WalletCards} label={"Amount due"}>
            <p className="font-medium">{formatCurrency(amountDue)}</p>
          </DetailsData>
          <DetailsData icon={CreditCard} label={"Paid amount"}>
            <p className="font-medium">{formatCurrency(amountPaid)}</p>
          </DetailsData>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">
            Remaining amount
          </span>

          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(remainingAmount)}
          </span>
        </div>

        {receipt && (
          <>
            <Separator />

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Payment receipt</h3>
              </div>

              <img
                src={receipt}
                alt="Payment receipt"
                className="w-full object-cover rounded-xl"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentsCard;
