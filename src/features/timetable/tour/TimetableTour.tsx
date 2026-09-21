import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const TimetableTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='course-filter']",
      title: t("tour.timetable.courseFilter"),
      content: t("tour.timetable.courseFilterContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-timetable']",
      title: t("tour.timetable.courseTimetable"),
      content: t("tour.timetable.courseTimetableContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='teacher-timetable']",
      title: t("tour.timetable.teacherTimetable"),
      content: t("tour.timetable.teacherTimetableContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID="timetable" />;
};

export default TimetableTour;
