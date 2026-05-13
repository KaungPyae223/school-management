import {
  ArrowRight,
  BookOpen,
  EllipsisVertical,
  Pencil,
  PlayCircle,
  Trash2,
  UserPen,
  Users,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const CoursesCard = () => {
  return (
    <Card className="shadow-sm hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1769736540771-3fdda750175b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-300"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon-sm"
              className="absolute top-3 right-3 bg-primary/50 hover:bg-primary/90"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-sm shadow-sm p-3">
            15,0000
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">JLPT N5 Class</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Master basic Japanese language skills for the JLPT N5 examination
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3">
          <CourseStatsCard
            icon={
              <Users size={14} className="text-blue-600 dark:text-blue-400" />
            }
            label="Students"
            value="10"
          />

          <CourseStatsCard
            icon={
              <UserPen
                size={14}
                className="text-purple-600 dark:text-purple-400"
              />
            }
            label="Teachers"
            value="10"
          />

          <CourseStatsCard
            icon={
              <BookOpen
                size={14}
                className="text-orange-600 dark:text-orange-400"
              />
            }
            label="Classes"
            value="20"
          />

          <CourseStatsCard
            icon={
              <PlayCircle
                size={14}
                className="text-orange-600 dark:text-orange-400"
              />
            }
            label="Active"
            value="5"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          View Course Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const CourseStatsCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/50">
      <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/30">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};

export default CoursesCard;
