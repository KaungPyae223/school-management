import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const StudentsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='search']",
      title: t("tour.students.search"),
      content: t("tour.students.searchContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='view-change']",
      title: t("tour.students.viewChange"),
      content: t("tour.students.viewChangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='export-csv']",
      title: t("tour.students.exportCsv"),
      content: t("tour.students.exportCsvContent"),
      skipBeacon: true,
    },

    {
      target: "[data-tour='create-student']",
      title: t("tour.students.createStudent"),
      content: t("tour.students.createStudentContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"students"} />;
};

export default StudentsTour;
