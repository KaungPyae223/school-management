import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import SettingsPasswordCreateForm from "../components/SettingsPasswordCreateForm";
import SettingsPasswordChangeForm from "../components/SettingsPasswordChangeForm";

const SettingsManagePassword = () => {
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

  const { hasPassword } = useLoaderData();

  if (!hasPassword) return <SettingsPasswordCreateForm />;

  return <SettingsPasswordChangeForm />;
};

export default SettingsManagePassword;

