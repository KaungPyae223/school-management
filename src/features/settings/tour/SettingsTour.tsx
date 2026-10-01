import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const SettingsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='appearance']",
      title: t("tour.settings.appearance"),
      content: t("tour.settings.appearanceContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='default-view']",
      title: t("tour.settings.defaultView"),
      content: t("tour.settings.defaultViewContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='theme']",
      title: t("tour.settings.theme"),
      content: t("tour.settings.themeContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='language']",
      title: t("tour.settings.language"),
      content: t("tour.settings.languageContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='password']",
      title: t("tour.settings.password"),
      content: t("tour.settings.passwordContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='two-factor']",
      title: t("tour.settings.twoFactor"),
      content: t("tour.settings.twoFactorContent"),
      skipBeacon: true,
      placement: "left",
    },
    {
      target: "[data-tour='backup']",
      title: t("tour.settings.backup"),
      content: t("tour.settings.backupContent"),
      skipBeacon: true,
      placement: "left",
    },
  ];

  return <Tour steps={steps} tourID={"settings"} />;
};

export default SettingsTour;
