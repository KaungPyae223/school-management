import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useModeStore } from "../../../stores/useModeStore";

const SettingsChangeAppearance = () => {
  const { mode, setMode } = useModeStore();

  return (
    <div className="flex items-center gap-5 justify-between">
      <div className="space-y-0.5">
        <p>Change Apperance</p>
        <p className="text-xs text-muted-foreground">
          Choose how the app looks on your device
        </p>
      </div>
      <ButtonGroup>
        <Button
          size={"sm"}
          variant={mode === "system" ? "default" : "outline"}
          onClick={() => setMode("system")}
        >
          <Monitor />
        </Button>
        <Button
          size={"sm"}
          variant={mode === "light" ? "default" : "outline"}
          onClick={() => setMode("light")}
        >
          <Sun />
        </Button>
        <Button
          size={"sm"}
          variant={mode === "dark" ? "default" : "outline"}
          onClick={() => setMode("dark")}
        >
          <Moon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SettingsChangeAppearance;
