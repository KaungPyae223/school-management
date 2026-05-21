import { Download, Grid2X2Icon, List, Plus, Search } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";

const CoursesHeader = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-2">
          <TabsList>
            <TabsTrigger value="grid">
              <Grid2X2Icon className="w-4 h-4 mr-1" /> Grid
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-1" /> List
            </TabsTrigger>
          </TabsList>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-0.5" /> Export CSV
          </Button>

          <Link to="/courses/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> Add Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesHeader;
