import { CreditCardIcon } from "lucide-react";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { Tabs } from "../../../components/ui/tabs";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { paymentService } from "../../../services/payments";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import PaymentHeader from "../components/PaymentHeader";
import { AnimatePresence, m } from "framer-motion";
import PaymentList from "../components/PaymentList";
import Paginate from "../../../components/paginate/Paginate";
import PageDataShow from "../../../components/page/PageDataShow";

const PaymentsPage = () => {
  useAddBreadcrumb({
    title: "Payments",
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
      <PaymentHeader />
      <PageDataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription="There are no payments available at the moment. Please add a payment to get started!"
        emptyTitle="No Payments"
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
              <PaymentList data={data?.data} view="initial" />
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
              <PaymentList data={data?.data} view="all" />
            </m.div>
          )}
        </AnimatePresence>
        <Paginate meta={data?.meta} />
      </PageDataShow>
    </Tabs>
  );
};

export default PaymentsPage;
