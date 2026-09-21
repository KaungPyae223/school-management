import type { Step } from "react-joyride";

import { useTranslation } from "react-i18next";

import Tour from "../../../components/tour/Tour";

const TeachersDetailsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='edit']",
      title: t("tour.teachersDetails.editTeacher"),
      content: t("tour.teachersDetails.editTeacherContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='delete']",
      title: t("tour.teachersDetails.deleteTeacher"),
      content: t("tour.teachersDetails.deleteTeacherContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='search']",
      title: t("tour.teachersDetails.searchTeacherClasses"),
      content: t("tour.teachersDetails.searchTeacherClassesContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='teacher-classes']",
      title: t("tour.teachersDetails.teacherClasses"),
      content: t("tour.teachersDetails.teacherClassesContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='teacher-timetable']",
      title: t("tour.teachersDetails.teacherTimetable"),
      content: t("tour.teachersDetails.teacherTimetableContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID="teachers-details" />;
};

export default TeachersDetailsTour;
