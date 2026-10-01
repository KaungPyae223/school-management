import { ChevronRight, Clock, Wallet } from "lucide-react";

import { CardContent, CardFooter } from "../../../../components/ui/card";
import { formatCurrency } from "../../../../utils/format-currency";
import { Button } from "../../../../components/ui/button";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import DataShow from "../../../../components/data/DataShow";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import DashboardOutstandingPaymentCard from "./DashboardOutstandingPaymentCard";
import { useGetOutstandingPayment } from "../../hooks/api/useGetOutstandingPayment";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const DashboardOutstandingPaymentContainer = ({
  totalPendingAmount,
}: {
  totalPendingAmount: number;
}) => {
  const { t } = useTranslation();
  const {
    payments,
    hasNextPage,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
  } = useGetOutstandingPayment();

  if (error) {
    throw error;
  }

  return (
    <DashboardCard
      title={t("dashboard.outstandingPayments.title")}
      description={t("dashboard.outstandingPayments.description")}
      icon={Wallet}
      dataTour="outstanding-payment"
    >
      <DataShow
        isLoading={isLoading}
        dataLength={payments.length}
        emptyTitle={t("dashboard.outstandingPayments.emptyTitle")}
        emptyDescription={t("dashboard.outstandingPayments.emptyDescription")}
        emptyIcon={Clock}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4 pb-0">
            <div className="space-y-4">
              {payments.map((data: any) => (
                <DashboardOutstandingPaymentCard key={data.id} data={data} />
              ))}
              {hasNextPage && (
                <div ref={loadingRef} className="py-2 text-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      Loading more...
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </DataShow>

      <CardFooter className="py-2.5 mt-auto text-xs flex justify-between items-center">
        <span>
          {t("dashboard.outstandingPayments.totalPending")}:{" "}
          <strong className="text-amber-600 dark:text-amber-400">
            {replaceLocalDigit(formatCurrency(totalPendingAmount))}
          </strong>
        </span>
        <Button variant="outline" size="sm" className="text-xs h-8">
          {t("dashboard.outstandingPayments.viewAllPayments")}{" "}
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </DashboardCard>
  );
};

export default DashboardOutstandingPaymentContainer;
