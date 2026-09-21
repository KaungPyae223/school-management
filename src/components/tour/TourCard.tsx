import type { TooltipRenderProps } from "react-joyride";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

const TourCard = ({
  continuous,
  index,
  isLastStep,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) => {
  const { t } = useTranslation();

  return (
    <div {...tooltipProps}>
      <Card className="w-80 shadow-xl">
        <CardHeader>
          <CardTitle>
            {step.title ?? `${t("tour.card.step")} ${index + 1}`}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground">
          {step.content}
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3">
          <Button size="sm" variant="ghost" {...skipProps}>
            {t("tour.card.skip")}
          </Button>

          <div className="flex gap-2">
            {index > 0 && (
              <Button size="sm" variant="outline" {...backProps}>
                {t("tour.card.back")}
              </Button>
            )}

            {continuous && (
              <Button size="sm" {...primaryProps}>
                {isLastStep ? t("tour.card.finish") : t("tour.card.next")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TourCard;
