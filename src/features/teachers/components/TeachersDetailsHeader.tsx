import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../components/ui/card";
import { AnimatePresence, m } from "framer-motion";
import SearchInput from "../../../components/search-input/SearchInput";
import { TabsList, TabsTrigger } from "../../../components/ui/tabs";

const TeachersDetailsHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-wrap items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "classes" && (
            <m.div
              key="classes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchInput />
            </m.div>
          )}
          {tab === "timetable" && (
            <m.div
              key="timetable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div></div>
            </m.div>
          )}
        </AnimatePresence>
        <TabsList>
          <TabsTrigger value="classes">{t("teachers.classes")}</TabsTrigger>
          <TabsTrigger value="timetable">{t("teachers.timetable")}</TabsTrigger>
        </TabsList>
      </CardContent>
    </Card>
  );
};

export default TeachersDetailsHeader;
