import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { SettingsChangeMode } from "../components/SettingsChangeMode";

const SettingsPage = () => {
  useAddBreadcrumb({
    title: "Settings",
  });

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3.5 py-3">
        <SettingsChangeMode />
        <Separator />
        <SettingsChangeMode />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
