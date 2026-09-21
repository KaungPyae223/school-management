import type { Step } from "react-joyride";
import { useTranslation } from "react-i18next";
import Tour from "../../../components/tour/Tour";

const PaymentsTour = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      target: "[data-tour='search']",
      title: t("tour.payments.search"),
      content: t("tour.payments.searchContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='outstanding-payment']",
      title: t("tour.payments.outstandingPayment"),
      content: t("tour.payments.outstandingPaymentContent"),
      skipBeacon: true,
    },
    {
      target: "[data-tour='all-payment']",
      title: t("tour.payments.allPayment"),
      content: t("tour.payments.allPaymentContent"),
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"payments"} />;
};

export default PaymentsTour;
