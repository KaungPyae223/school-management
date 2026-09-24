import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

const LoadingPage = ({ layout = false }: { layout?: boolean }) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 ",
        layout ? "flex-1" : "h-screen",
      )}
    >
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          {t("loading.pleaseWait")}
        </p>

        <h1 className="text-4xl font-bold text-primary">
          {t("loading.title")}
        </h1>

        <p className="text-muted-foreground mt-3 mb-8">
          {t("loading.fetchingPageContent")}
        </p>

        <div className="flex items-center justify-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
