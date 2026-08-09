import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useModeStore } from "../../../stores/useModeStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const SettingsChangeAppearance = () => {
  const { t } = useTranslation();
  const { mode, setMode } = useModeStore();

  return (
    <div className="flex items-center gap-5 justify-between pb-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.changeAppearance.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.changeAppearance.description")}
        </p>
      </div>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={mode === "system" ? "default" : "outline"}
              onClick={() => setMode("system")}
            >
              <Monitor />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("settings.changeAppearance.system")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={mode === "light" ? "default" : "outline"}
              onClick={() => setMode("light")}
            >
              <Sun />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("settings.changeAppearance.light")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={mode === "dark" ? "default" : "outline"}
              onClick={() => setMode("dark")}
            >
              <Moon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("settings.changeAppearance.dark")}</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

export default SettingsChangeAppearance;
