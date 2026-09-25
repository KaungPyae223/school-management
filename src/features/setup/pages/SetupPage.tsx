import { AnimatePresence, m } from "framer-motion";
import SetupIntro from "../components/SetupIntro";
import { Button } from "../../../components/ui/button";
import SetupPreferences from "../components/SetupPreferences";
import SetupImportBackup from "../components/SetupImportBackup";
import SetupPassword from "../components/SetupPassword";
import Setup2FA from "../components/Setup2FA";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";

import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useSetup } from "../hooks/useSetup";
import { useTranslation } from "react-i18next";

const SetupPage = () => {
  const { t } = useTranslation();
  const {
    step,
    setStep,
    canScrollPrev,
    canScrollNext,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleComplete,
  } = useSetup();

  return (
    <>
      <Carousel
        setApi={setStep}
        className="w-full h-screen flex gap-4 flex-col items-center justify-center"
      >
        <CarouselContent className="max-w-xl w-full ">
          <CarouselItem className="flex flex-col justify-center">
            <div className="p-0.5  ">
              <SetupIntro />
            </div>
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-center">
            <div className="p-0.5 ">
              <SetupPreferences />
            </div>
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-center">
            <div className="p-0.5 ">
              <SetupImportBackup />
            </div>
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-center">
            <div className="p-0.5">
              <Setup2FA />
            </div>
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-center">
            <div className="p-0.5">
              <SetupPassword />
            </div>
          </CarouselItem>
        </CarouselContent>

        <AnimatePresence mode="wait" initial={false}>
          {!canScrollPrev && (
            <m.div
              key="intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Button onClick={() => step.scrollNext()} className="mx-auto">
                {t("setup.nav.start")}
              </Button>
            </m.div>
          )}
          {canScrollPrev && (
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-xl mx-auto  w-full flex justify-between"
            >
              <Button onClick={() => step.scrollPrev()} variant="outline">
                {t("setup.nav.back")}
              </Button>
              <AnimatePresence mode="wait" initial={false}>
                {canScrollNext && (
                  <m.div
                    key="next"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Button onClick={() => step.scrollNext()}>
                      {t("setup.nav.next")}
                    </Button>
                  </m.div>
                )}
                {!canScrollNext && (
                  <m.div
                    key="complete"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Button onClick={() => setConfirmDialogOpen(true)}>
                      {t("setup.nav.complete")}
                    </Button>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          )}
        </AnimatePresence>
      </Carousel>
      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={handleComplete}
        title={t("setup.confirm.title")}
        description={t("setup.confirm.description")}
      />
    </>
  );
};

export default SetupPage;
