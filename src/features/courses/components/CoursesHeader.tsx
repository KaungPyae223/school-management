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

const CoursesHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  const columns = [
    { title: t("courses.fields.name"), key: "Name" },
    { title: t("courses.fields.price"), key: "Price" },
    { title: t("courses.fields.description"), key: "Description" },
    { title: t("courses.enrollments"), key: "Enrollments" },
    { title: t("courses.teachers"), key: "Teachers" },
    { title: t("courses.classes"), key: "Classes" },
    { title: t("courses.active"), key: "Active" },
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
                  alwaysSelectedColumns={["Name", "Price"]}
                  defaultSelectedColumns={[
                    "Name",
                    "Price",
                    "Description",
                    "Created At",
                  ]}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <ChangeTrashView />

          <ViewChange />

          <Button variant="outline">
            <Download className="w-4 h-4 mr-0.5" /> {t("students.exportCsv")}
          </Button>

          <Link to="/courses/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> {t("courses.addCourse")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesHeader;
