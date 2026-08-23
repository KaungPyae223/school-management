import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Navigate, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import Settings2FAVerify from "../components/Settings2FAVerify";
import SettingsDataBackupForm from "../components/SettingsDataBackupForm";

const SettingsBackupPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: "Manage Backup",
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: "Manage Backup",
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
