import { isRouteErrorResponse, useRouteError } from "react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import useAddBreadcrumb from "../../hooks/use-add-breadcrumb";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorStatus = "Something went wrong";
  let errorMessage = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  useAddBreadcrumb({
    title: "Error",
  });

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-4">
          {errorStatus}
        </p>

        <h1 className="text-4xl font-bold text-primary">Unexpected Error</h1>

        <p className="text-muted-foreground mt-3 mb-8">{errorMessage}</p>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />
            Reload page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
