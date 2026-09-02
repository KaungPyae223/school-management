import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarOff,
  DoorOpen,
  GraduationCap,
  Layers,
  UserPlus,
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
import { useNavigate, useSearchParams } from "react-router";
import CardCretedUpdated from "../../../../components/card-utils/CardCretedUpdated";
import CardMenu from "../../../../components/card-utils/CardMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { formatDate } from "../../../../utils/format-date";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import ClassesDeleteAlert from "../alerts/ClassesDeleteAlert";
import ClassesStatus from "../shared/ClassesStatus";
import ClassesTeacherCard from "../details/ClassesTeacherCard";
import { changeTime } from "../../../../utils/change-time";
import CardData from "../../../../components/card-utils/CardData";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import CardDayBadge from "../../../../components/card-utils/CardDayBadge";

const ClassesCard = ({ classData }: { classData: any }) => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

  const openingDays = classData.days.split(",");

  return (
    <>
      <Card className="shadow-xs hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          <ImageDisplay
            image={classData.course_image}
            alt={classData.course_name}
            fallbackIcon={BookOpen}
            display="card"
          />
          {!isTrashView && classData.status != "complete" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon-sm"
                  onClick={() => navigate(`/classes/enroll/${classData.id}`)}
                  className="absolute bottom-3 right-3 text-white/80 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("classes.enrolledStudent")}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <CardMenu
            onEdit={() => navigate(`/classes/edit/${classData.id}`)}
            onDelete={() => setConfirmDialogOpen(true)}
          />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-sm shadow-xs ">
              {formatCurrency(classData.price)}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <ClassesStatus status={classData.status} />
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">{classData.course_name}</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="px-2 py-1 text-sm flex items-center gap-2"
                >
                  <Layers /> {replaceLocalDigit(classData.batch)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {t("classes.batch", {
                    batch: replaceLocalDigit(classData.batch),
                  })}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          {classData.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
              {classData.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="mt-auto">
          <div className="grid grid-cols-2 gap-3 ">
            <CardData
              icon={
                <CalendarClock
                  size={14}
                  className="text-purple-600 dark:text-purple-400"
                />
              }
              iconBg="bg-purple-100 dark:bg-purple-900/30"
              label={t("classes.fields.startTime")}
              value={changeTime(classData.startTime)}
            />

            <CardData
              icon={
                <CalendarClock
                  size={14}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              label={t("classes.fields.endTime")}
              value={changeTime(classData.endTime)}
            />
            <div className="col-span-2 w-full border border-border rounded-lg  px-3 py-2">
              <div className="text-muted-foreground text-xs flex items-center gap-1.5">
                <Calendar className="size-3" /> {t("classes.scheduleDays")}
                <Badge variant="secondary" className="ms-auto">
                  {t("classes.daysCount", {
                    count: replaceLocalDigit(openingDays.length),
                  })}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 mt-2.5">
                {openingDays.map((day: string) => (
                  <CardDayBadge day={day} variant="outline" key={day} />
                ))}
              </div>
            </div>

            <ClassesTeacherCard
              image={classData.teacher_image}
              name={classData.teacher_name}
              className="rounded-lg col-span-2 px-2"
            />

            <div className="flex items-center col-span-2 w-full justify-between rounded-lg border border-border px-3 py-2 ">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30">
                  <GraduationCap
                    size={16}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <p className="text-xs ">
                    {t("classes.fields.totalStudents")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("classes.enrolledStudents")}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="font-medium text-foreground"
              >
                {replaceLocalDigit(classData.total_students)}
              </Badge>
            </div>
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
                {replaceLocalDigit(classData.withdrawn_students)}
              </Badge>
            </div>
            <CardData
              icon={
                <CalendarCheck2
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              }
              border
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              label={t("classes.fields.startDate")}
              value={formatDate(classData.startDate)}
            />

            <CardData
              icon={
                <CalendarOff
                  size={14}
                  className="text-red-600 dark:text-red-400"
                />
              }
              border
              iconBg="bg-red-100 dark:bg-red-900/30"
              label={t("classes.fields.endDate")}
              value={
                classData.endDate
                  ? formatDate(classData.endDate)
                  : t("students.tba")
              }
            />
          </div>
        </CardContent>

        <CardCretedUpdated
          createdAt={classData.createdAt}
          updatedAt={classData.updatedAt}
        />

        <CardFooter>
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => navigate(`/classes/details/${classData.id}`)}
          >
            {t("classes.viewClassDetails")}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
      <ClassesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={classData.id}
      />
    </>
  );
};

export default ClassesCard;
