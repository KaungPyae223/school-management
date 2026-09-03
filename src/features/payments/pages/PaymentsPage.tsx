import { useTranslation } from "react-i18next";
import { CreditCardIcon } from "lucide-react";
import { Tabs } from "../../../components/ui/tabs";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import PaymentsHeader from "../components/list/PaymentsHeader";
import { AnimatePresence, m } from "framer-motion";
import PaymentsList from "../components/list/PaymentsList";
import Paginate from "../../../components/paginate/Paginate";
import DataShow from "../../../components/data/DataShow";
import { useGetAllPayments } from "../hooks/api/useGetAllPayments";

const PaymentsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("payments.title"),
  });

  const { view, changeView } = useViewTabChange("outstanding");

  const { data, isLoading } = useGetAllPayments();

  return (
    <Tabs
      value={view}
      onValueChange={changeView}
      defaultValue="outstanding"
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
          {view === "outstanding" && (
            <m.div
              key="outstanding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentsList data={data?.data} />
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
              <PaymentsList data={data?.data} />
            </m.div>
          )}
        </AnimatePresence>
        <Paginate meta={data?.meta} />
      </DataShow>
    </Tabs>
  );
};

export default PaymentsPage;
