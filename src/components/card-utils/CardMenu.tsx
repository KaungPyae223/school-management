import { ArchiveRestore, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSearchParams } from "react-router";

const CardMenu = ({
  onEdit,
  onDelete,
  onRestore,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onRestore?: () => void;
}) => {
  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          className="absolute top-3 right-3 text-primary/80 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border dark:border-border/50"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isTrashView ? (
            <DropdownMenuItem onClick={onRestore}>
              <ArchiveRestore className="mr-2 h-4 w-4" /> Restore
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardMenu;
