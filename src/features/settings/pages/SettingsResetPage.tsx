import { useLoaderData } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import Settings2FAVerify from "../components/2fa/Settings2FAVerify";
import { useTranslation } from "react-i18next";
import SettingsResetConfirm from "../components/reset/SettingsResetConfirm";

const SettingsResetPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("settings.reset.title"),
    params: [
      {
        name: t("settings.title"),
        link: "/settings",
      },
      {
        name: t("settings.reset.title"),
        link: `/settings/reset`,
      },
    ],
  });

  const { is2FAEnabled, is2FAVerified } = useLoaderData();

  if (is2FAEnabled && !is2FAVerified) return <Settings2FAVerify />;

  return <SettingsResetConfirm />;
};

export default SettingsResetPage;
