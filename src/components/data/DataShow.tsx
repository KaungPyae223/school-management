import LoadingComponent from "../loading/LoadingComponent";
import EmptyComponent from "../empty/EmptyComponent";
import { type LucideIcon } from "lucide-react";

const DataShow = ({
  isLoading,
  dataLength,
  children,
  emptyDescription,
  emptyTitle,
  emptyIcon,
  action,
  className,
}: {
  isLoading: boolean;
  dataLength: number;
  children: React.ReactNode;
  emptyDescription: string;
  emptyTitle: string;
  emptyIcon: LucideIcon;
  action?: { label: string; link: string };
  className?: string;
}) => {
  if (isLoading) return <LoadingComponent className={className} />;

  if (dataLength === 0)
    return (
      <EmptyComponent
        description={emptyDescription}
        title={emptyTitle}
        icon={emptyIcon}
        action={action}
        className={className}
      />
    );

  return children;
};

export default DataShow;
