import { LayoutGrid, List } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../../../../components/ui/button";
import { ButtonGroup } from "../../../../components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { useDefaultViewStore } from "../../../../stores/useDefaultViewStore";

const SettingsChangeDefaultView = () => {
  const { t } = useTranslation();
  const { view, setView } = useDefaultViewStore();

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.changeDefaultView.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.changeDefaultView.description")}
        </p>
      </div>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={view === "grid" ? "default" : "outline"}
              onClick={() => setView("grid")}
            >
              <LayoutGrid />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("settings.changeDefaultView.grid")}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
            >
              <List />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("settings.changeDefaultView.list")}</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

export default SettingsChangeDefaultView;
