import { type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { useSearchParams } from "react-router";
import { Card } from "../ui/card";

const EmptyComponent = ({
  title = "No courses yet",
  description = "There are no courses available at the moment. Please add a course to get started!",
  action,
  icon: Icon,
}: {
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  icon: LucideIcon;
}) => {
  const [searchParams] = useSearchParams();

  const trash = searchParams.get("trash");

  return (
    <Card className="shadow-sm py-16">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-20">
            <Icon className="size-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">{title}</EmptyTitle>
          <EmptyDescription className="max-w-sm">
            {description}
          </EmptyDescription>
        </EmptyHeader>
        {action && !trash && (
          <EmptyContent>
            <Button size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </Card>
  );
};

export default EmptyComponent;
