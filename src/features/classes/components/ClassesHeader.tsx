import { Download, Plus } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

import ColumnSelector from "../../../components/header/ColumnSelector";
import { AnimatePresence, m } from "framer-motion";
import ChangeTrashView from "../../../components/header/ChangeTrashView";
import SearchInput from "../../../components/search-input/SearchInput";
import ViewChange from "../../../components/header/ViewChange";

const ClassesHeader = ({
  tab,
  isTrashView = true,
}: {
  tab: string;
  isTrashView?: boolean;
}) => {
  const columns = [
    { title: "Name", key: "Name" },
    { title: "Teacher", key: "Teacher" },
    { title: "Total Students", key: "Total Students" },
    { title: "Days", key: "Days" },
    { title: "Price", key: "Price" },
    { title: "Status", key: "Status" },
    { title: "Time", key: "Time" },
    { title: "Start Date", key: "Start Date" },
    { title: "End Date", key: "End Date" },
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <SearchInput />
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
            <Download className="w-4 h-4 mr-0.5" /> Export CSV
          </Button>

          <Link to="/classes/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> Add Class
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesHeader;
