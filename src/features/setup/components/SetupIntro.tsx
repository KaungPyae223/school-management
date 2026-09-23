import { HardDriveDownload, WifiOff, ShieldCheck, School } from "lucide-react";
import { useTranslation } from "react-i18next";

const highlights = [
  { icon: HardDriveDownload, key: "local" },
  { icon: WifiOff, key: "offline" },
  { icon: ShieldCheck, key: "private" },
] as const;

const SetupIntro = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <School className="size-8" />
      </div>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        {t("setup.intro.title")}
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("setup.intro.subtitle")}
      </p>

      <div className="my-auto grid w-full gap-3 text-left sm:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.key} className="rounded-xl border p-4 ">
            <h.icon className="size-5 text-primary" />
            <p className="mt-3 text-sm font-medium">
              {t(`setup.intro.highlights.${h.key}.title`)}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t(`setup.intro.highlights.${h.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupIntro;
