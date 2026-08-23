import { DatabaseBackup, FileArchive } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={t("settings.backup.manageTitle")} />
      <CardContent>
        <Tabs defaultValue="export" className="space-y-3">
          <TabsList className="w-full">
            <TabsTrigger value="export">
              <FileArchive /> {t("settings.backup.exportTab")}
            </TabsTrigger>
            <TabsTrigger value="import">
              <DatabaseBackup />
              {t("settings.backup.importTab")}
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
