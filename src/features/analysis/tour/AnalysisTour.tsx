import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const AnalysisTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='schedule']",
      title: t("tour.analysis.schedule"),
      content: t("tour.analysis.scheduleContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='demographics']",
      title: t("tour.analysis.demographics"),
      content: t("tour.analysis.demographicsContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='retention']",
      title: t("tour.analysis.retention"),
      content: t("tour.analysis.retentionContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='top-courses']",
      title: t("tour.analysis.topCourses"),
      content: t("tour.analysis.topCoursesContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='teacher-revenue']",
      title: t("tour.analysis.teacherRevenue"),
      content: t("tour.analysis.teacherRevenueContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='workload']",
      title: t("tour.analysis.workload"),
      content: t("tour.analysis.workloadContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"analysis"} />;
};

export default AnalysisTour;
