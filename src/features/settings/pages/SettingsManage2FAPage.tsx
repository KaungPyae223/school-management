import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import Settings2FAEnable from "../components/Settings2FAEnable";

const SettingsManage2FAPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: "Manage Two-Factor Authentication",
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: "Manage Two-Factor Authentication",
        link: `/settings/manage-2fa`,
      },
    ],
  });

  const { is2FAEnabled } = useLoaderData();

  if (!is2FAEnabled) return <Settings2FAEnable />;

  return <SettingsPasswordChangeForm />;
};

export default SettingsManage2FAPage;
