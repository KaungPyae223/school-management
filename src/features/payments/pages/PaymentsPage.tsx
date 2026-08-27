import { useTranslation } from "react-i18next";
import { CreditCardIcon } from "lucide-react";
import { Tabs } from "../../../components/ui/tabs";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { paymentService } from "../../../services/payments";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import PaymentsHeader from "../components/list/PaymentsHeader";
import { AnimatePresence, m } from "framer-motion";
import PaymentsList from "../components/list/PaymentsList";
import Paginate from "../../../components/paginate/Paginate";
import DataShow from "../../../components/data/DataShow";

const PaymentsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("payments.title"),
  });

  const { view, changeView } = useViewTabChange("initial");

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["payments", { ...activeQueryParams, view }],
    queryFn: () =>
      paymentService.getAllPayments({ ...activeQueryParams, view }),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs
      value={view}
      onValueChange={changeView}
      defaultValue="initial"
      className="space-y-4"
    >
      <PaymentsHeader />
      <DataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription={t("payments.noPaymentsDesc")}
        emptyTitle={t("payments.noPaymentsTitle")}
        emptyIcon={CreditCardIcon}
      >
        <AnimatePresence mode="wait" initial={false}>
          {view === "initial" && (
            <m.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentsList data={data?.data} view="initial" />
            </m.div>
          )}

          {view === "all" && (
            <m.div
              key="all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentsList data={data?.data} view="all" />
            </m.div>
          )}
        </AnimatePresence>
        <Paginate meta={data?.meta} />
      </DataShow>
    </Tabs>
  );
};

export default PaymentsPage;
