import type { Step } from "react-joyride";

import { useTranslation } from "react-i18next";

import Tour from "../../../components/tour/Tour";

const ClassesDetailsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='complete-class']",
      title: t("tour.classesDetails.completeClass"),
      content: t("tour.classesDetails.completeClassContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='enroll-students']",
      title: t("tour.classesDetails.enrollStudents"),
      content: t("tour.classesDetails.enrollStudentsContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='edit']",
      title: t("tour.classesDetails.editClass"),
      content: t("tour.classesDetails.editClassContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='delete']",
      title: t("tour.classesDetails.deleteClass"),
      content: t("tour.classesDetails.deleteClassContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='search']",
      title: t("tour.classesDetails.searchStudents"),
      content: t("tour.classesDetails.searchStudentsContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID="classes-details" />;
};

export default ClassesDetailsTour;
