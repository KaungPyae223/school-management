import LoadingComponent from "../loading/LoadingComponent";
import EmptyComponent from "../empty/EmptyComponent";
import { type LucideIcon } from "lucide-react";

const PageDataShow = ({
  isLoading,
  dataLength,
  children,
  emptyDescription,
  emptyTitle,
  emptyIcon,
  action,
}: {
  isLoading: boolean;
  dataLength: number;
  children: React.ReactNode;
  emptyDescription: string;
  emptyTitle: string;
  emptyIcon: LucideIcon;
  action?: { label: string; link: string };
}) => {
  if (isLoading) return <LoadingComponent />;

  if (dataLength === 0)
    return (
      <EmptyComponent
        description={emptyDescription}
        title={emptyTitle}
        icon={emptyIcon}
        action={action}
      />
    );

  return children;
};

export default PageDataShow;
