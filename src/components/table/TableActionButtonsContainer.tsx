import { ArchiveRestore, Eye, Pencil, Trash2 } from "lucide-react";
import TableActionButton from "./TableActionButton";
import { useSearchParams } from "react-router";

const TableActionButtonsContainer = ({
  onView,
  onEdit,
  onDelete,
  onRestore,
  children,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  children?: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  return (
    <div className="flex items-center justify-end gap-1">
      {children}
      {onView && (
        <TableActionButton onClick={onView} icon={Eye} tooltip="View" />
      )}

      {isTrashView ? (
        onRestore && (
          <TableActionButton
            variant="default"
            className="bg-green-300 hover:bg-green-400 text-green-800"
             onClick={onRestore}
            icon={ArchiveRestore}
            tooltip="Restore"
          />
        )
      ) : (
        <>
          {onEdit && (
            <TableActionButton onClick={onEdit} icon={Pencil} tooltip="Edit" />
          )}
          {onDelete && (
            <TableActionButton
              onClick={onDelete}
              icon={Trash2}
              tooltip="Delete"
              variant="destructive"
            />
          )}
        </>
      )}
    </div>
  );
};

export default TableActionButtonsContainer;
