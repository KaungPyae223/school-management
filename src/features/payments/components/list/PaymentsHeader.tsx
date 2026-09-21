import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "../../../../components/ui/card";
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs";

import ColumnSelector from "../../../../components/header/ColumnSelector";
import { useViewTabChange } from "../../../../hooks/use-view-tab-change";
import SearchInput from "../../../../components/search-input/SearchInput";
import { Currency, HandCoins } from "lucide-react";

const PaymentsHeader = () => {
  const { t } = useTranslation();
  const { view } = useViewTabChange("outstanding");

  const columns = [
    { title: t("students.fields.name"), key: "Name" },
    { title: t("students.table.course"), key: "Course" },
    { title: t("students.table.price"), key: "Price" },
    { title: t("students.fields.phone"), key: "Phone" },
    { title: t("payments.paidAmount"), key: "Paid Amount" },
    { title: t("payments.remainingAmount"), key: "Remaining Amount" },
    { title: t("payments.paymentTimes"), key: "Payment Times" },

    ...(view === "outstanding"
      ? [
          { title: t("payments.firstPaidDate"), key: "First Paid Date" },
          { title: t("payments.lastPaidDate"), key: "Last Paid Date" },
        ]
      : []),
  ];

  const defaultSelectedColumns = [
    "Name",
    "Course",
    "Price",
    "Phone",
    "Paid Amount",
    "Remaining Amount",
    "Payment Times",
  ];

  return (
    <Card className="shadow-xs ">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <SearchInput />
          <ColumnSelector
            columns={columns}
            alwaysSelectedColumns={["Name", "Course", "Price"]}
            defaultSelectedColumns={defaultSelectedColumns}
          />
        </div>

        <TabsList>
          <TabsTrigger value="outstanding" data-tour="outstanding-payment">
            <HandCoins />
            {t("payments.outstandingPayments")}
          </TabsTrigger>
          <TabsTrigger value="all" data-tour="all-payment">
            <Currency />
            {t("payments.allPayments")}
          </TabsTrigger>
        </TabsList>
      </CardHeader>
    </Card>
  );
};

export default PaymentsHeader;
