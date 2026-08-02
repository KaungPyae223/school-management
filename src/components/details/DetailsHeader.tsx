import { ArchiveRestore, ChevronLeft, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { useNavigate } from "react-router";

const DetailsHeader = ({
  onUpdate,
  onDelete,
  onRestore,
  isDeleted = false,
  children,
}: {
  onUpdate: () => void;
  onDelete: () => void;
  onRestore?: () => void;
  isDeleted?: boolean;
  children?: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft /> Back
        </Button>
        <div className="flex items-center gap-3">
          {children}
          {isDeleted ? (
            <Button
              variant="default"
              className="bg-green-200 hover:bg-green-300 text-green-800"
              onClick={onRestore}
            >
              <ArchiveRestore className="size-3.5" />
              Restore
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onUpdate}>
                <Pencil className="size-3.5" />
                Edit
              </Button>
              <Button variant="destructive" onClick={onDelete}>
                <Trash className="size-3.5" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default DetailsHeader;
