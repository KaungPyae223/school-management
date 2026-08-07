import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

type SortOption = {
  field: string;
  label: string;
};

const CardSort = ({
  sortOptions,
  prefix = "",
}: {
  sortOptions: SortOption[];
  prefix?: string;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  const updateQueryParams = useSetQueryParams();

  const sort = searchParams.get("sort");
  const sortDirection = searchParams.get("sortDirection");

  const { t } = useTranslation();

  const handleSortKeyChange = (sortKey: string) => {
    if (sortKey === "none") {
      updateQueryParams({
        sort: null,
      });
      return;
    }

    updateQueryParams({
      sort: sortKey,
      sortDirection: sortDirection ?? "asc",
      page: 1,
    });
  };

  const handleSortDirectionChange = () => {
    const newDirection = sortDirection === "desc" ? "asc" : "desc";

    updateQueryParams({
      sortDirection: newDirection,
      page: 1,
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("general.sortBy")}
        </span>

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            key="none"
            variant={!sort ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortKeyChange("none")}
          >
            {t("general.none")}
          </Button>

          {sortOptions.map(({ field, label }) => (
            <Button
              key={field}
              variant={sort === field ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortKeyChange(field)}
            >
              {label}
            </Button>
          ))}

          <Button
            key="createdAt"
            variant={sort === `${prefix}createdAt` ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortKeyChange(`${prefix}createdAt`)}
          >
            {t("general.createdAt")}
          </Button>

          <Button
            key="updatedAt"
            variant={sort === `${prefix}updatedAt` ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortKeyChange(`${prefix}updatedAt`)}
          >
            {isTrashView ? t("general.deletedAt") : t("general.updatedAt")}
          </Button>
        </div>

        <Button variant="outline" onClick={handleSortDirectionChange}>
          {sortDirection === "desc" ? (
            <ArrowDown size={14} />
          ) : (
            <ArrowUp size={14} />
          )}
          {sortDirection === "desc" ? t("general.desc") : t("general.asc")}
        </Button>
      </div>
    </div>
  );
};

export default CardSort;
