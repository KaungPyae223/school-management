import { Joyride, STATUS, type EventData, type Step } from "react-joyride";
import { useTourStore, type TourId } from "../../stores/useTourStore";
import TourCard from "./TourCard";
import { useEffect } from "react";

const Tour = ({ steps, tourID }: { steps: Step[]; tourID: TourId }) => {
  const { completeTour, isTourCompleted, resetAllTours } = useTourStore();

  const completed = isTourCompleted(tourID);

  const handleEvent = (data: EventData) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      completeTour(tourID);
    }
  };

  if (completed) {
    return null;
  }

  return (
    <Joyride
      steps={steps}
      run={!completed}
      continuous
      onEvent={handleEvent}
      tooltipComponent={TourCard}
      options={{
        buttons: ["back", "skip", "primary"],
      }}
    />
  );
};

export default Tour;
