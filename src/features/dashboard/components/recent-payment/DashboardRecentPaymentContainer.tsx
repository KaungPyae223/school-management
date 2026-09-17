import { ChevronRight, CreditCard } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import DataShow from "../../../../components/data/DataShow";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { useGetRecentPayment } from "../../hooks/api/useGetRecentPayment";
import DashboardRecentPaymentCard from "./DashboardRecentPaymentCard";
import { useTranslation } from "react-i18next";

const DashboardRecentPaymentContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    isLoading,
    loadingRef,
    hasNextPage,
    isFetchingNextPage,
    error,
    payments,
  } = useGetRecentPayment();

  if (error) {
    throw error;
  }

  return (
    <DashboardCard
      title={t("dashboard.recentPayments.title")}
      description={t("dashboard.recentPayments.description")}
      dataTour="recent-payment"
    >
      <DataShow
        isLoading={isLoading}
        dataLength={payments?.length}
        emptyTitle={t("dashboard.recentPayments.emptyTitle")}
        emptyDescription={t("dashboard.recentPayments.emptyDescription")}
        emptyIcon={CreditCard}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4 pb-0">
            <div className="space-y-4 ">
              {payments?.map((payment) => (
                <DashboardRecentPaymentCard key={payment.id} data={payment} />
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
        <CardFooter className="py-2.5 mt-auto text-xs flex justify-between items-center">
          <span className="text-muted-foreground">
            {t("dashboard.recentPayments.showingPayments")}{" "}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => navigate("/payments")}
          >
            {t("dashboard.recentPayments.viewAllPayments")}{" "}
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};

export default DashboardRecentPaymentContainer;
