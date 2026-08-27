import { Search, UserPen } from "lucide-react";
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../components/ui/input-group";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { useTimetableTeacherSelect } from "../../hooks/teacher/useTimetableTeacherSelect";

const TimetableTeacherSelect = () => {
  const {
    searchTerm,
    teacherData,
    isLoading,
    hasMore,
    loadingRef,
    handleSearchChange,
    toggleColumn,
    selectAllFiltered,
    deselectAllFiltered,
    checkSelect,
    t,
  } = useTimetableTeacherSelect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPen className="h-4 w-4" />
          <span>{t("timetable.teachers")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          {t("timetable.selectTeachers")}
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
          {teacherData.length === 0 && !isLoading ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              {t("timetable.noTeachersFound")}
            </div>
          ) : (
            teacherData.map((teacher, index) => (
              <div key={teacher.id}>
                <DropdownMenuCheckboxItem
                  className="flex items-center gap-3 p-2 cursor-pointer transition-colors"
                  checked={checkSelect(teacher.id.toString())}
                  onCheckedChange={() => toggleColumn(teacher.id.toString())}
                  onSelect={(e) => e.preventDefault()}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={teacher.image} alt={`@${teacher.name}`} />
                    <AvatarFallback className="text-[10px] bg-secondary">
                      {generateImageFallBack(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm truncate">
                    {teacher.name}
                  </span>
                </DropdownMenuCheckboxItem>
                {index < teacherData.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))
          )}
          {hasMore && (
            <div ref={loadingRef} className="py-2 text-center">
              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  {t("form.loading")}
                </div>
              )}
            </div>
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

export default TimetableTeacherSelect;
