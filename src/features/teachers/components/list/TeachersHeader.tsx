import { useTranslation } from "react-i18next";
import { Download, Plus } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router";
import ColumnSelector from "../../../../components/header/ColumnSelector";
import { AnimatePresence, m } from "framer-motion";
import ChangeTrashView from "../../../../components/header/ChangeTrashView";
import SearchInput from "../../../../components/search-input/SearchInput";
import ViewChange from "../../../../components/header/ViewChange";
import { useGetAllTeachers } from "../../hooks/api/useGetAllTeachers";

const TeachersHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  const columns = [
    { title: t("teachers.fields.name"), key: "Name" },
    { title: t("teachers.fields.phone"), key: "Phone" },
    { title: t("teachers.fields.email"), key: "Email" },
    { title: t("teachers.fields.address"), key: "Address" },
    { title: t("teachers.fields.nrc"), key: "NRC" },
    { title: t("teachers.totalClasses"), key: "Total Classes" },
    { title: t("teachers.totalStudents"), key: "Total Students" },
  ];

  const { exportCSV } = useGetAllTeachers();

  return (
    <Card className="shadow-xs">
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
          <ChangeTrashView />

          <ViewChange />

          <Button onClick={exportCSV} variant="outline" data-tour="export-csv">
            <Download className="w-4 h-4 mr-0.5" /> {t("students.exportCsv")}
          </Button>

          <Link to="/teachers/create" data-tour="create-teacher">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> {t("teachers.addTeacher")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeachersHeader;
