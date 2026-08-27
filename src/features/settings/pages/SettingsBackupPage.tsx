import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Navigate, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import Settings2FAVerify from "../components/2fa/Settings2FAVerify";
import SettingsDataBackupForm from "../components/backup/SettingsDataBackupForm";

const SettingsBackupPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.backup.manageBreadcrumb"),
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: t("settings.backup.manageBreadcrumb"),
        link: `/settings/backup`,
      },
    ],
  });

  const { hasPassword, is2FAEnabled, is2FAVerified } = useLoaderData();

  if (!hasPassword) return <Navigate to="/settings/manage-password" />;

  if (is2FAEnabled && !is2FAVerified) return <Settings2FAVerify />;

  return <SettingsDataBackupForm />;
};

export default SettingsBackupPage;
