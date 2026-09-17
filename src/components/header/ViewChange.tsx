import { TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutGrid, List } from "lucide-react";
import { useTranslation } from "react-i18next";

const ViewChange = () => {
  const { t } = useTranslation();

  return (
    <TabsList data-tour="view-change">
      <TabsTrigger value="grid">
        <LayoutGrid className="w-4 h-4 mr-1" /> {t("general.grid")}
      </TabsTrigger>
      <TabsTrigger value="list">
        <List className="w-4 h-4 mr-1" /> {t("general.list")}
      </TabsTrigger>
    </TabsList>
  );
};

export default ViewChange;
