import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { useTheme } from "../../../components/theme-provider/theme-provider";
import { ButtonGroup } from "../../../components/ui/button-group";

const SettingsChangeAppearance = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-between">
      <div>
        <p>Change Apperance</p>
        <p className="text-xs text-muted-foreground">
          Choose how the app looks on your device
        </p>
      </div>
      <ButtonGroup>
        <Button
          size={"sm"}
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
        >
          <Monitor />
        </Button>
        <Button
          size={"sm"}
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
        <Button
          size={"sm"}
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SettingsChangeAppearance;
