import { ArchiveRestore, Eye, Pencil, Trash2 } from "lucide-react";
import TableActionButton from "./TableActionButton";
import { useSearchParams } from "react-router";

const TableActionButtonsContainer = ({
  onView,
  onEdit,
  onDelete,
  onRestore,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRestore?: () => void;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  return (
    <div className="flex items-center justify-end gap-1">
      <TableActionButton
        onClick={onView}
        icon={<Eye className="size-4" />}
        tooltip="View"
      />
      {isTrashView ? (
        <TableActionButton
          variant="default"
          className="bg-green-300 hover:bg-green-400"
          onClick={onRestore}
          icon={<ArchiveRestore className="size-4 text-green-800" />}
          tooltip="Restore"
        />
      ) : (
        <>
          <TableActionButton
            onClick={onEdit}
            icon={<Pencil className="size-4" />}
            tooltip="Edit"
          />
          <TableActionButton
            onClick={onDelete}
            icon={<Trash2 className="size-4 text-destructive" />}
            tooltip="Delete"
            variant="destructive"
          />
        </>
      )}
    </div>
  );
};

export default TableActionButtonsContainer;
