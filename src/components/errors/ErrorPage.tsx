import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import useAddBreadcrumb from "../../hooks/use-add-breadcrumb";

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);

  let errorStatus = t("errors.somethingWentWrong");
  let errorMessage = t("errors.unexpectedErrorMessage");

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  useAddBreadcrumb({
    title: t("errors.errorBreadcrumb"),
  });

  return (
    <div className="flex-1 h-dvh flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-4">
          {errorStatus}
        </p>

        <h1 className="text-4xl font-bold text-primary">
          {t("errors.unexpectedError")}
        </h1>

        <p className="text-muted-foreground mt-3 mb-8">{errorMessage}</p>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            {t("errors.goBack")}
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />
            {t("errors.reloadPage")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
