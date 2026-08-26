import { useTranslation } from "react-i18next";
import { Download, Plus } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

import ColumnSelector from "../../../components/header/ColumnSelector";
import { AnimatePresence, m } from "framer-motion";
import ChangeTrashView from "../../../components/header/ChangeTrashView";
import SearchInput from "../../../components/search-input/SearchInput";
import ViewChange from "../../../components/header/ViewChange";
import { AdvancedQueryToggle } from "../../../components/search-input/AdvancedQueryToggle";

const ClassesHeader = ({
  tab,
  isTrashView = true,
}: {
  tab: string;
  isTrashView?: boolean;
}) => {
  const { t } = useTranslation();

  const columns = [
    { title: t("classes.fields.name"), key: "Name" },
    { title: t("classes.fields.teacher"), key: "Teacher" },
    { title: t("classes.fields.totalStudents"), key: "Total Students" },
    { title: t("classes.fields.days"), key: "Days" },
    { title: t("classes.fields.price"), key: "Price" },
    { title: t("classes.fields.status"), key: "Status" },
    { title: t("classes.fields.time"), key: "Time" },
    { title: t("classes.fields.startDate"), key: "Start Date" },
    { title: t("classes.fields.endDate"), key: "End Date" },
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <SearchInput />

          <AdvancedQueryToggle />

          <AnimatePresence mode="wait" initial={false}>
            {tab === "list" && (
              <m.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ColumnSelector
                  columns={columns}
                  alwaysSelectedColumns={["Name", "Teacher"]}
                  defaultSelectedColumns={[
                    "Name",
                    "Teacher",
                    "Total Students",
                    "Days",
                    "Price",
                    "Status",
                    "Time",
                  ]}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          {isTrashView && <ChangeTrashView />}

          <ViewChange />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-0.5" /> {t("students.exportCsv")}
          </Button>

          <Link to="/classes/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> {t("classes.addClass")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesHeader;
