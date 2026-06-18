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
import ColumnSelector from "../../../components/header/ColumnSelector";
import { AnimatePresence, m } from "framer-motion";
import ChangeTrashView from "../../../components/header/ChangeTrashView";

const ClassesHeader = ({ tab }: { tab: string }) => {
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
          <AnimatePresence mode="wait" initial={false}>
            {tab === "list" && (
              <m.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ColumnSelector
                  columns={[
                    "Name",
                    "Price",
                    "Description",
                    "Enrollments",
                    "Teachers",
                    "Classes",
                    "Active",
                  ]}
                  alwaysSelectedColumns={["Name", "Price"]}
                  defaultSelectedColumns={[
                    "Name",
                    "Price",
                    "Description",
                    "Created At",
                  ]}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <ChangeTrashView />

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

          <Link to="/classes/create">
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> Add Class
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesHeader;
