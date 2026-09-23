import SettingsDataBackupImport from "../../settings/components/backup/SettingsDataBackupImport";
import { useTranslation } from "react-i18next";

const SetupImportBackup = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("setup.importBackup.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("setup.importBackup.description")}
        </p>
      </div>

      <div className="my-auto">
        <SettingsDataBackupImport removeHeader={true} />
      </div>
    </div>
  );
};

export default SetupImportBackup;
