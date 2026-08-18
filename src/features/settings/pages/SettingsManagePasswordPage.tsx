import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import SettingsPasswordCreateForm from "../components/SettingsPasswordCreateForm";
import SettingsPasswordChangeForm from "../components/SettingsPasswordChangeForm";
import Settings2FAVerify from "../components/Settings2FAVerify";

const SettingsManagePasswordPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.managePassword.breadcrumb"),
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: t("settings.managePassword.breadcrumb"),
        link: `/settings/manage-password`,
      },
    ],
  });

  const { hasPassword, is2FAEnabled, is2FAVerified } = useLoaderData();

  if (is2FAEnabled && !is2FAVerified) return <Settings2FAVerify />;

  if (!hasPassword)
    return <SettingsPasswordCreateForm navigateLink="/settings" />;

  return <SettingsPasswordChangeForm />;
};

export default SettingsManagePasswordPage;
