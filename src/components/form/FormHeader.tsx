import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { CardHeader } from "../ui/card";
import { useNavigate } from "react-router";

const FormHeader = ({
  title,
  back = true,
}: {
  title: string;
  back?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <CardHeader className="border-b">
      <div className="flex items-center justify-between gap-2">
        {back ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        ) : (
          <div></div>
        )}

        <div>
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
      </div>
    </CardHeader>
  );
};

export default FormHeader;
