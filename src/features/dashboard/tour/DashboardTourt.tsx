import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const DashboardTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='kpi']",
      title: t("tour.dashboard.kpi"),
      content: t("tour.dashboard.kpiContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='revenue-enrollment']",
      title: t("tour.dashboard.revenueEnrollment"),
      content: t("tour.dashboard.revenueEnrollmentContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-enrollment']",
      title: t("tour.dashboard.courseEnrollment"),
      content: t("tour.dashboard.courseEnrollmentContent"),
      skipBeacon: true,
    },

    {
      target: "[data-tour='today-classes']",
      title: t("tour.dashboard.todayClasses"),
      content: t("tour.dashboard.todayClassesContent"),
      skipBeacon: true,
    },

    {
      target: "[data-tour='recent-enrollment']",
      title: t("tour.dashboard.recentEnrollments"),
      content: t("tour.dashboard.recentEnrollmentsContent"),
      skipBeacon: true,
    },

    {
      target: "[data-tour='recent-payment']",
      title: t("tour.dashboard.recentPayments"),
      content: t("tour.dashboard.recentPaymentsContent"),
      skipBeacon: true,
      placement: "top",
    },

    {
      target: "[data-tour='outstanding-payment']",
      title: t("tour.dashboard.outstandingPayments"),
      content: t("tour.dashboard.outstandingPaymentsContent"),
      skipBeacon: true,
      placement: "top",
    },
  ];

  return <Tour steps={steps} tourID={"dashboard"} />;
};

export default DashboardTour;
