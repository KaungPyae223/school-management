import { Card, CardHeader } from "../../../components/ui/card";
import { TabsList, TabsTrigger } from "../../../components/ui/tabs";

import ColumnSelector from "../../../components/header/ColumnSelector";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import SearchInput from "../../../components/search-input/SearchInput";

const PaymentsHeader = () => {
  const { view } = useViewTabChange("initial");

  const columns = [
    { title: "Name", key: "Name" },
    { title: "Course", key: "Course" },
    { title: "Price", key: "Price" },
    { title: "Phone", key: "Phone" },

    { title: "Payment Times", key: "Payment Times" },

    ...(view === "initial"
      ? [
          { title: "First Paid Date", key: "First Paid Date" },
          { title: "Last Paid Date", key: "Last Paid Date" },
          { title: "Paid Amount", key: "Paid Amount" },
          { title: "Remaining Amount", key: "Remaining Amount" },
        ]
      : []),
  ];

  const defaultSelectedColumns = [
    "Name",
    "Course",
    "Price",
    "Phone",
    ...(view === "initial" ? ["Paid Amount", "Remaining Amount"] : []),
    "Payment Times",
  ];

  return (
    <Card className="shadow-sm ">
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
          <TabsTrigger value="initial">Initial Payments</TabsTrigger>
          <TabsTrigger value="all">All Payments</TabsTrigger>
        </TabsList>
      </CardHeader>
    </Card>
  );
};

export default PaymentsHeader;
