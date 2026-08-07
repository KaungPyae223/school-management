import { Download, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

import ColumnSelector from "../../../components/header/ColumnSelector";
import { AnimatePresence, m } from "framer-motion";
import SearchInput from "../../../components/search-input/SearchInput";
import ViewChange from "../../../components/header/ViewChange";

const StudentsHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  const columns = [
    { title: t("students.fields.name"), key: "Name" },
    { title: t("students.fields.phone"), key: "Phone" },
    { title: t("students.fields.email"), key: "Email" },
    { title: t("students.fields.address"), key: "Address" },
    { title: t("students.fields.gender"), key: "Gender" },
    { title: t("students.fields.dob"), key: "Date of Birth" },
    { title: t("students.totalClasses"), key: "Total Classes" },
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
                  alwaysSelectedColumns={["Name", "Phone", "Email"]}
                  defaultSelectedColumns={[
                    "Name",
                    "Phone",
                    "Email",
                    "Address",
                    "Total Classes",
                    "Created At",
                  ]}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <ViewChange />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-0.5" /> {t("students.exportCsv")}
          </Button>

          <Link to="/students/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> {t("students.addStudent")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsHeader;
