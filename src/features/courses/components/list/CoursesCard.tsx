import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  DoorOpen,
  PlayCircle,
  UserPen,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { formatCurrency } from "../../../../utils/format-currency";
import { useState } from "react";
import CoursesDeleteAlert from "../alerts/CoursesDeleteAlert";
import { useNavigate } from "react-router";
import CardCretedUpdated from "../../../../components/card-utils/CardCretedUpdated";
import CardMenu from "../../../../components/card-utils/CardMenu";
import CardData from "../../../../components/card-utils/CardData";
import CoursesRestoreAlert from "../alerts/CoursesRestoreAlert";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const CoursesCard = ({ course }: { course: any }) => {
  const { t } = useTranslation();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="shadow-xs hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          <ImageDisplay
            image={course.image}
            alt={course.name}
            fallbackIcon={BookOpen}
          />

          <CardMenu
            onEdit={() => navigate(`/courses/edit/${course.id}`)}
            onDelete={() => setDeleteConfirmDialogOpen(true)}
            onRestore={() => setRestoreConfirmDialogOpen(true)}
          />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-sm shadow-xs ">
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

        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <CardData
              icon={
                <ClipboardList
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              }
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              label={t("courses.totalStudents")}
              value={replaceLocalDigit(course.total_students)}
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
              label={t("courses.teachers")}
              value={replaceLocalDigit(course.total_teachers)}
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
              label={t("courses.classes")}
              value={replaceLocalDigit(course.total_classes)}
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
              label={t("courses.active")}
              value={replaceLocalDigit(course.total_active_classes)}
              border
            />
            <div className="col-span-2 flex w-full items-center justify-between rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-destructive/10 p-1.5 dark:bg-destructive/20">
                  <DoorOpen size={16} className="text-destructive" />
                </div>

                <div>
                  <p className="text-xs">{t("general.withdrawnStudents")}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("general.withdrawnStudentsDesc")}
                  </p>
                </div>
              </div>

              <Badge
                variant="secondary"
                className="font-medium text-foreground"
              >
                {replaceLocalDigit(course.withdrawn_students)}
              </Badge>
            </div>
          </div>
        </CardContent>

        <CardCretedUpdated
          createdAt={course.createdAt}
          updatedAt={course.updatedAt}
        />

        <CardFooter>
          <Button
            onClick={() => navigate(`/courses/details/${course.id}`)}
            variant="ghost"
            className="w-full justify-between"
          >
            {t("courses.viewCourseDetails")}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
      <CoursesDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={course.id}
      />
      <CoursesRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={course.id}
      />
    </>
  );
};

export default CoursesCard;
