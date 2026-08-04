import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import { formatCurrency } from "../../../utils/format-currency";
import { DollarSign, Wallet, CircleDollarSign, Hash } from "lucide-react";
import FormHeader from "../../../components/form/FormHeader";
import DetailsData from "../../../components/details/DetailsData";

const PaymentsDetailsInfoCard = ({
  enrollment,
  paymentsTimes,
  totalPaid,
}: {
  enrollment: any;
  paymentsTimes: number;
  totalPaid: number;
}) => {
  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title="Payments History" />
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center">
            <img
              src={enrollment.courseImage}
              alt={enrollment.class.course.name}
              className="h-24 w-24 m-4 shrink-0 border border-border  rounded-lg object-cover"
            />
            <Separator orientation="vertical" />
            <div className="flex-1 space-y-3 m-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {enrollment.class.course.name}
                </h3>
                <Badge variant="outline">Batch {enrollment.class.batch}</Badge>
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
                  <p className="text-xs text-muted-foreground">Student</p>
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
                label="Course Price"
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">
                  {formatCurrency(enrollment.price)}
                </p>
              </DetailsData>

              <DetailsData
                icon={Hash}
                label="Payment Times"
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">{paymentsTimes}</p>
              </DetailsData>
            </div>

            <div className="divide-x divide-border grid grid-cols-2">
              <DetailsData
                icon={Wallet}
                label="Total Paid"
                className="rounded-none"
                border={false}
              >
                <p className="font-medium">{formatCurrency(totalPaid)}</p>
              </DetailsData>

              <DetailsData
                icon={CircleDollarSign}
                label="Remaining Balance"
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
