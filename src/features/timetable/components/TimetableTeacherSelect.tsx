import { useState } from "react";
import { UserPen, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input"; // Make sure to import Input component
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";

// Mock data array
const TEACHERS = [
  {
    id: "1",
    name: "Kaung Pyae",
    avatar: "https://github.com/shadcn.png",
    initials: "KP",
  },
  { id: "2", name: "John Doe", avatar: "", initials: "JD" },
  { id: "3", name: "Jane Smith", avatar: "", initials: "JS" },
  { id: "4", name: "Alan Turing", avatar: "", initials: "AT" },
  { id: "5", name: "Ada Lovelace", avatar: "", initials: "AL" },
  { id: "6", name: "Grace Hopper", avatar: "", initials: "GH" },
  { id: "7", name: "John Doe", avatar: "", initials: "JD" },
  { id: "8", name: "Jane Smith", avatar: "", initials: "JS" },
  { id: "9", name: "Alan Turing", avatar: "", initials: "AT" },
  { id: "10", name: "Ada Lovelace", avatar: "", initials: "AL" },
  { id: "11", name: "Grace Hopper", avatar: "", initials: "GH" },
];

const TimetableTeacherSelect = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleColumn = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((col) => col !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Filter teachers based on search term
  const filteredTeachers = TEACHERS.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Select all filtered teachers
  const selectAllFiltered = () => {
    const filteredIds = filteredTeachers.map((teacher) => teacher.id);
    const newSelected = [...selected];
    filteredIds.forEach((id) => {
      if (!newSelected.includes(id)) {
        newSelected.push(id);
      }
    });
    setSelected(newSelected);
  };

  // Deselect all filtered teachers
  const deselectAllFiltered = () => {
    const filteredIds = filteredTeachers.map((teacher) => teacher.id);
    setSelected(selected.filter((id) => !filteredIds.includes(id)));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPen className="h-4 w-4" />
          <span>Teachers</span>
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {selected.length}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="px-2 pt-2.5 pb-1.5 font-medium uppercase tracking-wider text-muted-foreground">
          Select Teachers
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <InputGroup>
            <InputGroupInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className="h-75 p-1">
          {filteredTeachers.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              No teachers found
            </div>
          ) : (
            filteredTeachers.map((teacher, index) => (
              <div key={teacher.id}>
                <DropdownMenuCheckboxItem
                  className="flex items-center gap-3 p-2 cursor-pointer transition-colors"
                  checked={selected.includes(teacher.id)}
                  onCheckedChange={() => {
                    toggleColumn(teacher.id);
                  }}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={teacher.avatar}
                      alt={`@${teacher.name}`}
                    />
                    <AvatarFallback className="text-[10px] bg-secondary">
                      {teacher.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm truncate">
                    {teacher.name}
                  </span>
                </DropdownMenuCheckboxItem>
                {index < filteredTeachers.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            ))
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        {/* Select All / Deselect All Buttons */}
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

export default TimetableTeacherSelect;
