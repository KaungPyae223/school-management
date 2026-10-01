import React from "react";
import { useTranslation } from "react-i18next";

const ScrollSelectLoading = ({
  loadingRef,
  isLoading,
  isFetchingNextPage,
}: {
  loadingRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div ref={loadingRef} className="py-2 text-center">
      {(isLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          {t("form.loading")}
        </div>
      )}
    </div>
  );
};

export default ScrollSelectLoading;
