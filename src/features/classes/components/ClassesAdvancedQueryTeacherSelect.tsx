import { useTranslation } from "react-i18next";
import { Field } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import { teacherService } from "../../../services/teachers";
import { useSearchParams } from "react-router";

interface Teacher {
  id: number;
  name: string;
  image?: string;
}

const ClassesAdvancedQueryTeacherSelect = ({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, "teacherIds">;
  fieldState: ControllerFieldState;
}) => {
  const { t } = useTranslation();
  const teacherValue =
    field.value?.split(",").filter(Boolean).map(Number) ?? [];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showTeacherDropDown, setShowTeacherDropDown] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher[]>([]);
  const [teacherData, setTeacherData] = useState<Teacher[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [searchParams] = useSearchParams();

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchTeachers = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await teacherService.searchAllTeachers({
        search: value,
        page: page,
        limit: 5,
      });
      const results: Teacher[] = response?.data ?? [];
      setTeacherData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 5);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSelectedTeachers = async (teacherIDs: number[]) => {
    try {
      const response = await teacherService.searchAllTeachers({
        teacherIDs: teacherIDs,
      });
      const results: Teacher[] = response?.data ?? [];
      setSelectedTeacher(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers("", false);

    const teacherIDsFromURL = searchParams.get("teacherIds");
    const urlTeacherValue =
      teacherIDsFromURL?.split(",").filter(Boolean).map(Number) ?? [];

    console.log(teacherIDsFromURL);

    if (urlTeacherValue.length > 0) {
      fetchSelectedTeachers(urlTeacherValue);
    }
  }, []);

  useEffect(() => {
    if (field.value == "") {
      setSelectedTeacher([]);
    }
  }, [field.value]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !isLoading &&
          teacherData.length > 0
        ) {
          fetchTeachers(searchTerm);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  const debouncedTeacherSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchTeachers(value, false);
      }, 750),
    [],
  );

  useEffect(() => {
    debouncedTeacherSearch(searchTerm);

    return () => {
      debouncedTeacherSearch.cancel();
    };
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    if (teacherValue.includes(teacher.id)) {
      return;
    }

    field.onChange(
      [...teacherValue, teacher.id].filter((item) => item !== "").join(","),
    );
    setSelectedTeacher((prev) => [...prev, teacher]);
    setShowTeacherDropDown(false);
    setSearchTerm("");
  };

  const handleRemoveTeacher = (teacherId: number) => {
    const newTeacherValue = teacherValue
      .filter((teacher) => teacher !== teacherId)
      .join(",");

    field.onChange(newTeacherValue);

    setSelectedTeacher((prev) =>
      prev.filter((teacher) => teacher.id !== teacherId),
    );
  };

  const displayTeacherData = teacherData.filter(
    (teacher: Teacher) => !teacherValue.includes(teacher?.id),
  );

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="relative">
        <Input
          id="teacherID"
          value={searchTerm}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          onFocus={() => setShowTeacherDropDown(true)}
          onBlur={() => setShowTeacherDropDown(false)}
          aria-invalid={fieldState.invalid}
          placeholder={t("classes.fields.teacherPlaceholder")}
          autoComplete="off"
          className={cn(fieldState.invalid ? "border-destructive" : "")}
        />
        {showTeacherDropDown && displayTeacherData.length > 0 && (
          <div className="absolute w-full z-50 bg-card border divide-y rounded-lg mt-1 shadow-lg dark:shadow-gray-900/30">
            <ScrollArea className="max-h-72">
              {displayTeacherData.map((data: Teacher) => (
                <div
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  key={data.id}
                  onMouseDown={() => {
                    handleSelectTeacher(data);
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={data.image} alt={data.name} />
                    <AvatarFallback>
                      {generateImageFallBack(data.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("classes.fields.teacher")}
                    </p>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
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
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start items-center gap-3 mt-1.5 p-2 border rounded-md">
        {selectedTeacher.length === 0 ? (
          <span className="text-xs text-muted-foreground self-center">
            {t("classes.advancedQuery.noTeacherSelected")}
          </span>
        ) : (
          selectedTeacher.map((teacher) => (
            <div
              className="flex text-sm items-center gap-1.5 text-foreground/80 p-0.5 ps-2 rounded-lg border"
              key={teacher.id}
            >
              <span>{teacher.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleRemoveTeacher(teacher.id)}
              >
                <X />
              </Button>
            </div>
          ))
        )}
      </div>
    </Field>
  );
};

export default ClassesAdvancedQueryTeacherSelect;
