import React from "react";
import { useTranslation } from "react-i18next";

const DataLoadMore = ({
  loadingRef,
  isFetchingNextPage,
}: {
  loadingRef: React.RefObject<HTMLDivElement>;
  isFetchingNextPage: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div ref={loadingRef} className="py-2 text-center">
      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          {t("general.loadingMore")}
        </div>
      )}
    </div>
  );
};

export default DataLoadMore;
