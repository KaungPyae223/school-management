import type { Step } from "react-joyride";

import { useTranslation } from "react-i18next";

import Tour from "../../../components/tour/Tour";

const CoursesDetailsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='edit']",
      title: t("tour.coursesDetails.editCourse"),
      content: t("tour.coursesDetails.editCourseContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='delete']",
      title: t("tour.coursesDetails.deleteCourse"),
      content: t("tour.coursesDetails.deleteCourseContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='search']",
      title: t("tour.coursesDetails.searchCourseClasses"),
      content: t("tour.coursesDetails.searchCourseClassesContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-classes']",
      title: t("tour.coursesDetails.courseClasses"),
      content: t("tour.coursesDetails.courseClassesContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-timetable']",
      title: t("tour.coursesDetails.courseTimetable"),
      content: t("tour.coursesDetails.courseTimetableContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID="courses-details" />;
};

export default CoursesDetailsTour;
