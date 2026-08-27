import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  WalletCards,
  CreditCard,
  StickyNote,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { formatCurrency } from "../../../../utils/format-currency";
import { Badge } from "../../../../components/ui/badge";
import { formatDate } from "../../../../utils/format-date";
import DetailsData from "../../../../components/details/DetailsData";
import { useState } from "react";
import PaymentsDeleteAlert from "../alerts/PaymentsDeleteAlert";
import { Button } from "../../../../components/ui/button";

const PaymentsCard = ({
  data,
  remainingAmount,
  amountDue,
  index,
  classId,
}: {
  data: any;
  index: number;
  remainingAmount: number;
  amountDue: number;
  classId: number;
}) => {
  const { t } = useTranslation();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <Card className="mx-auto w-full overflow-hidden shadow-sm sm:max-w-lg">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm py-3 px-3">
                <span className="text-muted-foreground">#</span> {index}
              </Badge>
              <CardTitle className="text-lg">{t("payments.detailsTitle")}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setDeleteConfirmDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 ">
          {data.description && (
            <DetailsData icon={StickyNote} label={t("payments.fields.description")}>
              <p className="font-medium">{data.description}</p>
            </DetailsData>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            <DetailsData icon={CalendarDays} label={t("payments.paymentDate")}>
              <p className="font-medium">{formatDate(data.createdAt)}</p>
            </DetailsData>
            <DetailsData icon={WalletCards} label={t("payments.amountDue")}>
              <p className="font-medium">{formatCurrency(amountDue)}</p>
            </DetailsData>
            <DetailsData icon={CreditCard} label={t("payments.paidAmount")}>
              <p className="font-medium">{formatCurrency(data.amount)}</p>
            </DetailsData>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
            <span className="text-sm font-medium text-muted-foreground">
              {t("payments.remainingAmount")}
            </span>

            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(remainingAmount)}
            </span>
          </div>

          {data.image && (
            <>
              <Separator />

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold">{t("payments.paymentReceipt")}</h3>
                </div>

                <img
                  src={data.image}
                  alt="Payment receipt"
                  className="w-full object-cover rounded-xl"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <PaymentsDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={data.id}
        classId={classId}
      />
    </>
  );
};

export default PaymentsCard;
