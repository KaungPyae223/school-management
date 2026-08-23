import { DatabaseBackup, FileArchive } from "lucide-react";
import FormHeader from "../../../components/form/FormHeader";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import SettingsDataBackupExport from "./SettingsDataBackupExport";
import SettingsDataBackupImport from "./SettingsDataBackupImport";

const SettingsDataBackupForm = () => {
  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={"Manage Backup"} />
      <CardContent>
        <Tabs defaultValue="export" className="space-y-3">
          <TabsList className="w-full">
            <TabsTrigger value="export">
              <FileArchive /> Export Backup
            </TabsTrigger>
            <TabsTrigger value="import">
              <DatabaseBackup />
              Import Backup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="export">
            <SettingsDataBackupExport />
          </TabsContent>
          <TabsContent value="import">
            <SettingsDataBackupImport />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsDataBackupForm;
