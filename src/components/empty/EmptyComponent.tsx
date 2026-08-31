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
import { useNavigate, useSearchParams } from "react-router";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

const EmptyComponent = ({
  title = "No courses yet",
  description = "There are no courses available at the moment. Please add a course to get started!",
  action,
  icon: Icon,
  className,
}: {
  title?: string;
  description?: string;
  action?: { label: string; link: string };
  icon: LucideIcon;
  className?: string;
}) => {
  const [searchParams] = useSearchParams();

  const trash = searchParams.get("trash");

  const navigate = useNavigate();

  return (
    <Card className={cn("shadow-xs py-16", className)}>
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
            <Button size="sm" onClick={() => navigate(action.link)}>
              {action.label}
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </Card>
  );
};

export default EmptyComponent;
