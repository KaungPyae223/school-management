import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Compass, RotateCcw } from "lucide-react";

import { Button } from "../../../components/ui/button";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useTourStore } from "../../../stores/useTourStore";

const HelpGuidedTour = () => {
  const { t } = useTranslation();
  const { resetAllTours } = useTourStore();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleReset = () => {
    resetAllTours();
    setConfirmDialogOpen(false);
    toast.success(t("help.tour.success"));
  };

  return (
    <div className="flex items-center gap-5 justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Compass className="size-4 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <p className="font-medium">{t("help.tour.title")}</p>
          <p className="text-xs text-muted-foreground">
            {t("help.tour.description")}
          </p>
        </div>
      </div>

      <Button variant="outline" onClick={() => setConfirmDialogOpen(true)}>
        <RotateCcw />
        {t("help.tour.button")}
      </Button>

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={handleReset}
        title={t("help.tour.confirmTitle")}
        description={t("help.tour.confirmDescription")}
        confirmButtonText={t("help.tour.confirmButton")}
      />
    </div>
  );
};

export default HelpGuidedTour;
