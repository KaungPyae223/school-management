import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import Settings2FAEnable from "../components/Settings2FAEnable";
import Settings2FADisable from "../components/Settings2FADisable";

const SettingsManage2FAPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.twoFactor.manageBreadcrumb"),
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: t("settings.twoFactor.manageBreadcrumb"),
        link: `/settings/manage-2fa`,
      },
    ],
  });

  const { is2FAEnabled } = useLoaderData();

  if (!is2FAEnabled) return <Settings2FAEnable />;

  return <Settings2FADisable />;
};

export default SettingsManage2FAPage;

