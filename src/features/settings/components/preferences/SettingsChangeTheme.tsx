import { useTranslation } from "react-i18next";
import { useColorSchemeStore } from "../../../stores/useColorSchemeStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const options = [
  { name: "default", key: "black", swatch: "bg-neutral-900" },
  { name: "blue", key: "blue", swatch: "bg-blue-600" },
  { name: "red", key: "red", swatch: "bg-red-600" },
  { name: "pink", key: "pink", swatch: "bg-pink-600" },
  { name: "orange", key: "orange", swatch: "bg-orange-600" },
] as const;

const SettingsChangeTheme = () => {
  const { t } = useTranslation();
  const colorScheme = useColorSchemeStore((s) => s.colorScheme);
  const setColorScheme = useColorSchemeStore((s) => s.setColorScheme);

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.changeTheme.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.changeTheme.description")}
        </p>
      </div>
      <div className="flex gap-2">
        {options.map((o) => {
          const colorLabel = t(`settings.changeTheme.colors.${o.key}`);
          return (
            <Tooltip key={o.name}>
              <TooltipTrigger asChild>
                <button
                  key={o.name}
                  onClick={() => setColorScheme(o.name)}
                  aria-label={colorLabel}
                  className={`h-6 w-6 rounded-full ${o.swatch} ring-offset-2 ring-offset-background transition-all ${
                    colorScheme === o.name ? "ring-2 ring-foreground" : ""
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{colorLabel}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsChangeTheme;
