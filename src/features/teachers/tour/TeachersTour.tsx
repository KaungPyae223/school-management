import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const TeachersTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='search']",
      title: t("tour.teachers.search"),
      content: t("tour.teachers.searchContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='trash']",
      title: t("tour.teachers.trash"),
      content: t("tour.teachers.trashContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='view-change']",
      title: t("tour.teachers.viewChange"),
      content: t("tour.teachers.viewChangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='export-csv']",
      title: t("tour.teachers.exportCsv"),
      content: t("tour.teachers.exportCsvContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='create-teacher']",
      title: t("tour.teachers.createTeacher"),
      content: t("tour.teachers.createTeacherContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"teachers"} />;
};

export default TeachersTour;
