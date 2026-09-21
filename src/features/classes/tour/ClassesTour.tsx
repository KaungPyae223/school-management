import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";
import { useSetQueryParams } from "../../../hooks/use-set-query-params";

const ClassesTour = () => {
  const { t } = useTranslation();
  const updateQueryParams = useSetQueryParams();

  const steps: Step[] = [
    {
      target: "[data-tour='search']",
      title: t("tour.classes.search"),
      content: t("tour.classes.searchContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='advanced-search']",
      title: t("tour.classes.advancedSearch"),
      content: t("tour.classes.advancedSearchContent"),
      skipBeacon: true,
      after: () => {
        updateQueryParams({ advancedQuery: "true" });
      },
    },
    {
      target: "[data-tour='teacher-filter']",
      title: t("tour.classes.teacherFilter"),
      content: t("tour.classes.teacherFilterContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-filter']",
      title: t("tour.classes.courseFilter"),
      content: t("tour.classes.courseFilterContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='date-range']",
      title: t("tour.classes.dateRange"),
      content: t("tour.classes.dateRangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='time-range']",
      title: t("tour.classes.timeRange"),
      content: t("tour.classes.timeRangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='price-range']",
      title: t("tour.classes.priceRange"),
      content: t("tour.classes.priceRangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='reset-filters']",
      title: t("tour.classes.resetFilters"),
      content: t("tour.classes.resetFiltersContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='apply-filters']",
      title: t("tour.classes.applyFilters"),
      content: t("tour.classes.applyFiltersContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='view-change']",
      title: t("tour.classes.viewChange"),
      content: t("tour.classes.viewChangeContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='export-csv']",
      title: t("tour.classes.exportCsv"),
      content: t("tour.classes.exportCsvContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='create-class']",
      title: t("tour.classes.createClass"),
      content: t("tour.classes.createClassContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"classes"} />;
};

export default ClassesTour;
