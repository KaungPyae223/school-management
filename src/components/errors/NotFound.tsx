import { useNavigate } from "react-router";
import useAddBreadcrumb from "../../hooks/use-add-breadcrumb";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  useAddBreadcrumb({
    title: "Not Found",
  });

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-4">
          Error 404
        </p>

        <h1 className="text-4xl font-bold text-primary">Page not found</h1>

        <p className="text-muted-foreground mt-3 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Button>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
