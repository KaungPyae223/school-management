import SettingsDataBackupImport from "../../settings/components/backup/SettingsDataBackupImport";
import { DatabaseBackup } from "lucide-react";
import { useTranslation } from "react-i18next";

const SetupImportBackup = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <DatabaseBackup className="size-5" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          {t("setup.importBackup.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("setup.importBackup.description")}
        </p>
      </div>

      <SettingsDataBackupImport removeHeader={true} />
    </div>
  );
};

export default SetupImportBackup;
