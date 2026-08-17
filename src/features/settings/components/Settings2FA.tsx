import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";

const Settings2FA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">Two-Factor Authentication</p>
        <p className="text-xs text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      <div>
        <Button
          onClick={() => navigate("/settings/manage-2fa")}
          variant="outline"
        >
          Enable 2FA
        </Button>
      </div>
    </div>
  );
};

export default Settings2FA;
