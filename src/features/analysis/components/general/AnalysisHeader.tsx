import { useTranslation } from "react-i18next";

const AnalysisHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t("analysis.header.title")}
        </h1>
      </div>
    </div>
  );
};

export default AnalysisHeader;
