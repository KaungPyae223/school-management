import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import HelpGuidedTour from "../components/HelpGuidedTour";
import HelpSourceCode from "../components/HelpSourceCode";
import HelpContact from "../components/HelpContact";

const HelpPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("general.help"),
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      <Card className="shadow-xs">
        <CardHeader className="border-b">
          <CardTitle>{t("help.introTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-justify">
            {t("help.introDescription")}
          </p>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="shadow-xs">
        <CardHeader className="border-b">
          <CardTitle>{t("help.gettingStarted.title")}</CardTitle>
          <CardDescription>
            {t("help.gettingStarted.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y ">
          <HelpGuidedTour />
          <HelpSourceCode />
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="shadow-xs">
        <CardHeader className="border-b">
          <CardTitle>{t("help.contact.title")}</CardTitle>
          <CardDescription>{t("help.contact.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <HelpContact />
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
