import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  PlayCircle,
  UserPen,
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

import { formatCurrency } from "../../../utils/format-currency";
import { useState } from "react";
import CoursesDeleteAlert from "./CoursesDeleteAlert";
import { useNavigate } from "react-router";
import CardCretedUpdated from "../../../components/card-utils/CardCretedUpdated";
import CardMenu from "../../../components/card-utils/CardMenu";
import CardData from "../../../components/card-utils/CardData";

const CoursesCard = ({ course }: { course: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="shadow-sm hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          {course.image ? (
            <>
              <img
                src={course.image}
                alt=""
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-300"></div>
            </>
          ) : (
            <div className="w-full h-48 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
              <BookOpen size={48} className="text-background" />
            </div>
          )}
          <CardMenu
            onEdit={() => navigate(`/courses/edit/${course.id}`)}
            onDelete={() => setConfirmDialogOpen(true)}
          />
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="secondary"
              className="text-sm shadow-sm bg-white/90 text-foreground"
            >
              {formatCurrency(course.price)}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{course.name}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="grid grid-cols-2 gap-3">
            <CardData
              icon={
                <ClipboardList
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              }
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              label="Enrollments"
              value={course.total_enrollments}
              border
            />

            <CardData
              icon={
                <UserPen
                  size={14}
                  className="text-purple-600 dark:text-purple-400"
                />
              }
              iconBg="bg-purple-100 dark:bg-purple-900/30"
              label="Teachers"
              value={course.total_teachers}
              border
            />

            <CardData
              icon={
                <BookOpen
                  size={14}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              label="Classes"
              value={course.total_classes}
              border
            />

            <CardData
              icon={
                <PlayCircle
                  size={14}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              label="Active"
              value={course.total_active_classes}
              border
            />
          </div>
        </CardContent>

        <CardCretedUpdated
          createdAt={course.createdAt}
          updatedAt={course.updatedAt}
        />

        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Course Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
      <CoursesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={course.id}
      />
    </>
  );
};

export default CoursesCard;
