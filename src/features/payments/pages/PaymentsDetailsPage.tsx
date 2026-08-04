import { useLoaderData, useParams } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

import PaymentsDetailsInfoCard from "../components/PaymentsDetailsInfoCard";
import PaymentsCard from "../components/PaymentsCard";
import { useAppQuery } from "../../../hooks/use-app-query";
import { paymentService } from "../../../services/payments";
import PageDataShow from "../../../components/page/PageDataShow";
import { CreditCard } from "lucide-react";
import PaymentsCreateCard from "../components/PaymentsCreateCard";
import { Separator } from "../../../components/ui/separator";

const PaymentsDetailsPage = () => {
  const { enrollmentId } = useParams();

  useAddBreadcrumb({
    title: "Payments History",
    params: [
      {
        name: "Payments",
        link: "/payments",
      },
      {
        name: "History",
        link: `/payments/${enrollmentId}`,
      },
    ],
  });

  const { enrollment } = useLoaderData();

  const { data, isLoading } = useAppQuery({
    queryKey: ["payments", enrollmentId],
    queryFn: () =>
      paymentService.getAllPaymentsByEnrollment(Number(enrollmentId)),
  }) as { data: { data: any[] }; isLoading: boolean };

  const totalPaid =
    data?.data?.reduce(
      (acc: number, payment: any) => acc + payment.amount,
      0,
    ) || 0;

  const finalAmountDue = enrollment.price - totalPaid;

  let remainAmount = enrollment.price;

  return (
    <div className="space-y-6 ">
      <PaymentsDetailsInfoCard
        enrollment={enrollment}
        totalPaid={totalPaid}
        paymentsTimes={data?.data?.length}
      />

      <Separator className="w-full sm:max-w-lg mx-auto" />

      {finalAmountDue > 0 && (
        <>
          <PaymentsCreateCard
            amountDue={finalAmountDue}
            classId={enrollment.class.id}
            enrollmentId={enrollment.id}
          />
          <Separator className="w-full sm:max-w-lg mx-auto" />
        </>
      )}

      <PageDataShow
        isLoading={isLoading}
        dataLength={data?.data?.length || 0}
        emptyDescription="There are no payments made for this class yet."
        emptyTitle="No Payments"
        emptyIcon={CreditCard}
        className="w-full sm:max-w-lg mx-auto h-fit py-12"
      >
        {data?.data?.map((data, index) => {
          const amountDue = remainAmount;
          remainAmount -= data.amount;

          return (
            <PaymentsCard
              key={data.id}
              data={data}
              remainingAmount={remainAmount}
              amountDue={amountDue}
              index={index + 1}
              classId={enrollment.class.id}
            />
          );
        })}
      </PageDataShow>
    </div>
  );
};

export default PaymentsDetailsPage;
