import { useTranslation } from "react-i18next";
import { Code2, ExternalLink } from "lucide-react";

import { Button } from "../../../components/ui/button";

// Dummy repository link — replace with the real source URL.
const SOURCE_URL = "https://github.com/kaung-pyae/school-management";

const HelpSourceCode = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Code2 className="size-4 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <p className="font-medium">{t("help.source.title")}</p>
          <p className="text-xs text-muted-foreground">
            {t("help.source.description")}
          </p>
        </div>
      </div>

      <Button variant="outline" asChild>
        <a href={SOURCE_URL} target="_blank" rel="noreferrer">
          {t("help.source.button")}
          <ExternalLink data-icon="inline-end" />
        </a>
      </Button>
    </div>
  );
};

export default HelpSourceCode;
