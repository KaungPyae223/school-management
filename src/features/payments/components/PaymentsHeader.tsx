import { Card, CardHeader } from "../../../components/ui/card";
import { TabsList, TabsTrigger } from "../../../components/ui/tabs";

import ColumnSelector from "../../../components/header/ColumnSelector";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import SearchInput from "../../../components/search-input/SearchInput";

const PaymentsHeader = () => {
  const { view } = useViewTabChange("initial");

  const columns = [
    "Name",
    "Course",
    "Email",
    "Phone",
    "Price",
    ...(view === "initial"
      ? ["First Paid Date", "Last Paid Date", "Paid Amount", "Remaining Amount"]
      : []),
    "Payment Times",
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
