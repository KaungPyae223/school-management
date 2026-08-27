import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Badge } from "../../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { formatCurrency } from "../../../../utils/format-currency";
import {
  DollarSign,
  Wallet,
  CircleDollarSign,
  Hash,
  BookOpen,
} from "lucide-react";
import FormHeader from "../../../../components/form/FormHeader";
import DetailsData from "../../../../components/details/DetailsData";
import ImageDisplay from "../../../../components/image/ImageDisplay";

import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const PaymentsDetailsInfoCard = ({
  enrollment,
  paymentsTimes,
  totalPaid,
}: {
  enrollment: any;
  paymentsTimes: number;
  totalPaid: number;
}) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title={t("payments.historyTitle")} />
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center">
            <ImageDisplay
              image={enrollment.courseImage}
              alt={enrollment.class.course.name}
              fallbackIcon={BookOpen}
              display="data"
            />
            <Separator orientation="vertical" />
            <div className="flex-1 space-y-3 m-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {enrollment.class.course.name}
                </h3>
                <Badge variant="outline">
                  {t("classes.batch", {
                    batch: replaceLocalDigit(enrollment.class.batch),
                  })}
                </Badge>
              </div>

              <div className="flex items-center gap-3 rounded-md border p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={enrollment.student.image}
                    alt={enrollment.student.name}
                  />
                  <AvatarFallback>
                    {generateImageFallBack(enrollment.student.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">{t("payments.student")}</p>
                  <p className="text-sm font-medium">
                    {enrollment.student.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border border-t border-border text-sm">
            <div className="divide-x divide-border grid grid-cols-2">
              <DetailsData
                icon={DollarSign}
                label={t("payments.coursePrice")}
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">
                  {formatCurrency(enrollment.price)}
                </p>
              </DetailsData>

              <DetailsData
                icon={Hash}
                label={t("payments.paymentTimes")}
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">{replaceLocalDigit(paymentsTimes)}</p>
              </DetailsData>
            </div>

            <div className="divide-x divide-border grid grid-cols-2">
              <DetailsData
                icon={Wallet}
                label={t("payments.totalPaid")}
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">{formatCurrency(totalPaid)}</p>
              </DetailsData>

              <DetailsData
                icon={CircleDollarSign}
                label={t("payments.remainingBalance")}
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">
                  {formatCurrency(enrollment.price - totalPaid)}
                </p>
              </DetailsData>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsDetailsInfoCard;

