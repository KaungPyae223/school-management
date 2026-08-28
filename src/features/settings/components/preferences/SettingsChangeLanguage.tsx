import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../../../translate/i18n";
import { useLanguageStore } from "../../../../stores/useLanguageStore";

const SettingsChangeLanguage = () => {
  const { t } = useTranslation();

  const { language, setLanguage } = useLanguageStore();

  const getCurrentLanguageLabel = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.value === code);
    return lang ? `${lang.label}` : code;
  };

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="space-y-0.5">
        <p className="font-medium">{t("settings.changeLanguage.title")}</p>
        <p className="text-xs text-muted-foreground">
          {t("settings.changeLanguage.description")}
        </p>
      </div>

      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full max-w-32">
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue
            placeholder={t("settings.changeLanguage.selectPlaceholder")}
          >
            {getCurrentLanguageLabel(language)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {t("settings.changeLanguage.languagesLabel")}
            </SelectLabel>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsChangeLanguage;
