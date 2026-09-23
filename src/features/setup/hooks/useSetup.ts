import { useEffect, useState } from "react";
import type { CarouselApi } from "../../../components/ui/carousel";
import { useNavigate } from "react-router";
import { setupService } from "../../../services/setup";

export const useSetup = () => {
  const [step, setStep] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!step) return;

    const updateState = () => {
      setCanScrollPrev(step.canScrollPrev());
      setCanScrollNext(step.canScrollNext());
    };

    updateState();
    step.on("select", updateState);
    step.on("reInit", updateState);
  }, [step]);

  const handleComplete = async () => {
    try {
      await setupService.complete();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return {
    step,
    setStep,
    canScrollPrev,
    canScrollNext,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleComplete,
  };
};
