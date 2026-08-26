import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Funnel } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export const AdvancedQueryToggle = () => {
  const updateQueryParams = useSetQueryParams();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const isAdvancedQuery = searchParams.get("advancedQuery");

  const toggleAdvancedQuery = () => {
    isAdvancedQuery
      ? updateQueryParams({ advancedQuery: null })
      : updateQueryParams({ advancedQuery: "true" });
  };

  return (
    <Button
      variant={isAdvancedQuery ? "default" : "outline"}
      className={cn("flex gap-2")}
      onClick={toggleAdvancedQuery}
    >
      <Funnel className={cn("size-4", !isAdvancedQuery && "text-primary")} />
      {t("general.advancedSearch")}
    </Button>
  );
};
