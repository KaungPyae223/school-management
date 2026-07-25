import { useEffect, useRef, useState } from "react";
import { Search, LibraryBig } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";
import { debounce } from "lodash";
import { useSearchParams } from "react-router";

import { useSetQueryParams } from "../../../hooks/use-set-query-params";

interface Teacher {
  id: string;
  name: string;
  image?: string;
}

const TimetableCourseSelect = () => {
  const [searchParam] = useSearchParams();

  const selected = searchParam.get("selectedCourses")
    ? searchParam.get("selectedCourses").split(",")
    : [];

  const deSelected = searchParam.get("deSelectedCourses");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseData, setTeacherData] = useState<Teacher[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadingRef = useRef<HTMLDivElement>(null);
  const updateQueryParams = useSetQueryParams();

  const fetchCourses = async (value: string, append: boolean = true) => {
    setIsLoading(true);
    try {
      const response = await window.api.searchAllCourses({
        search: value,
        page: page,
        limit: 20,
      });
      const results: Teacher[] = response?.data ?? [];
      setTeacherData((prev) => (append ? [...prev, ...results] : results));
      setHasMore(results.length === 20);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses("", false);
  }, []);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !isLoading &&
          courseData.length > 0
        ) {
          fetchCourses(searchTerm);
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
  }, [hasMore, isLoading, page, courseData.length]);

  const debouncedTeacherSearch = debounce((value: string) => {
    setPage(1);
    setHasMore(true);
    fetchCourses(value, false);
  }, 750);

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

  const toggleColumn = (id: string) => {
    const newSelect = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    updateQueryParams({
      selectedCourses: newSelect.join(","),
    });
  };

  const selectAllFiltered = () => {
    updateQueryParams({
      selectedCourses: null,
      deSelectedCourses: null,
    });
  };

  const deselectAllFiltered = () => {
    updateQueryParams({
      deSelectedCourses: true,
      selectedCourses: null,
    });
  };

  const checkSelect = (id: string): boolean => {
    if (selected.length == 0 && !deSelected) {
      return true;
    } else if (deSelected) {
      return selected.includes(id);
    } else {
      return !selected.includes(id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LibraryBig className="h-4 w-4" />
          <span>Courses</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          Select Courses
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <InputGroup>
            <InputGroupInput
              placeholder="Search..."
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
          {courseData.length === 0 && !isLoading ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              No courses found
            </div>
          ) : (
            courseData.map((course, index) => (
              <div key={course.id}>
                <DropdownMenuCheckboxItem
                  className="flex items-center gap-3 p-2 cursor-pointer transition-colors"
                  checked={checkSelect(course.id.toString())}
                  onCheckedChange={() => toggleColumn(course.id.toString())}
                  onSelect={(e) => e.preventDefault()}
                >
                  <img
                    src={course.image}
                    className="h-10 w-10 object-cover items-center rounded-md"
                  />
                  <span className="font-medium text-sm truncate">
                    {course.name}
                  </span>
                </DropdownMenuCheckboxItem>
                {index < courseData.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))
          )}
          {hasMore && (
            <div ref={loadingRef} className="py-2 text-center">
              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  Loading more...
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
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={deselectAllFiltered}
          >
            Deselect All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimetableCourseSelect;
