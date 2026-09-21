import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const ClassesCreateTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='select-course']",
      title: t("tour.classesCreate.selectCourse"),
      content: t("tour.classesCreate.selectCourseContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='select-teacher']",
      title: t("tour.classesCreate.selectTeacher"),
      content: t("tour.classesCreate.selectTeacherContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='select-day']",
      title: t("tour.classesCreate.selectDay"),
      content: t("tour.classesCreate.selectDayContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='select-start-date']",
      title: t("tour.classesCreate.selectStartDate"),
      content: t("tour.classesCreate.selectStartDateContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='select-start-time']",
      title: t("tour.classesCreate.selectStartTime"),
      content: t("tour.classesCreate.selectStartTimeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='select-end-time']",
      title: t("tour.classesCreate.selectEndTime"),
      content: t("tour.classesCreate.selectEndTimeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='description']",
      title: t("tour.classesCreate.addDescription"),
      content: t("tour.classesCreate.addDescriptionContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"classes-create"} />;
};

export default ClassesCreateTour;
