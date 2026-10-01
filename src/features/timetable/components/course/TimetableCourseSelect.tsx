import { BookOpen, LibraryBig, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../components/ui/input-group";
import { useTranslation } from "react-i18next";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { useTimetableCourseSelect } from "../../hooks/course/useTimetableCourseSelect";
import ScrollSelectLoading from "../../../../components/form/ScrollSelectLoading";

const TimetableCourseSelect = () => {
  const { t } = useTranslation();
  const {
    searchTerm,
    courses,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadingRef,
    error,
    handleSearchChange,
    toggleColumn,
    selectAllFiltered,
    deselectAllFiltered,
    checkSelect,
  } = useTimetableCourseSelect();

  if (error) {
    throw error;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" data-tour="course-filter">
          <LibraryBig className="h-4 w-4" />
          <span>{t("timetable.courses")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          {t("timetable.selectCourses")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <InputGroup>
            <InputGroupInput
              placeholder={t("general.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className="h-75 p-1">
          {courses.length === 0 && !isLoading && !isFetchingNextPage ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              {t("timetable.noCoursesFound")}
            </div>
          ) : (
            courses.map((course, index) => (
              <div key={course.id}>
                <DropdownMenuCheckboxItem
                  className="flex items-center gap-3 p-2 cursor-pointer transition-colors"
                  checked={checkSelect(course.id.toString())}
                  onCheckedChange={() => toggleColumn(course.id.toString())}
                  onSelect={(e) => e.preventDefault()}
                >
                  <ImageDisplay
                    alt={course.name}
                    fallbackIcon={BookOpen}
                    image={course.image}
                    display="list"
                  />
                  <span className="font-medium text-sm truncate">
                    {course.name}
                  </span>
                </DropdownMenuCheckboxItem>
                {index < course.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))
          )}
          {hasNextPage && (
            <ScrollSelectLoading
              loadingRef={loadingRef}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        <div className="p-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={selectAllFiltered}
          >
            {t("timetable.selectAll")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={deselectAllFiltered}
          >
            {t("timetable.deselectAll")}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimetableCourseSelect;
