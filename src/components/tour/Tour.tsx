import { Joyride, type EventData, type Step } from "react-joyride";
import { useTourStore, type TourId } from "../../stores/useTourStore";
import TourCard from "./TourCard";

const Tour = ({ steps, tourID }: { steps: Step[]; tourID: TourId }) => {
  const { completeTour, isTourCompleted } = useTourStore();

  const completed = isTourCompleted(tourID);

  const handleEvent = (data: EventData) => {
    if (data.status === "finished" || data.status === "skipped") {
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
