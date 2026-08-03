import { useLoaderData, useParams } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

import PaymentsDetailsInfoCard from "../components/PaymentsDetailsInfoCard";
import PaymentsCard from "../components/PaymentsCard";

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

  const { payments, enrollment } = useLoaderData();

  const totalPaid = payments?.reduce((acc, payment) => acc + payment.amount, 0);
  const amountDue = enrollment.price - totalPaid;

  let remainAmount = enrollment.price;

  return (
    <div className="space-y-6">
      <PaymentsDetailsInfoCard
        enrollment={enrollment}
        totalPaid={totalPaid}
        payments={payments}
      />

      {payments.map((data, index) => {
        const amountDue = remainAmount;
        remainAmount -= data.amount;

        return (
          <PaymentsCard
            key={data.id}
            amountDue={amountDue}
            amountPaid={data.amount}
            date={data.createdAt}
            receipt={data.image}
            remainingAmount={remainAmount}
            description={data.description}
            index={index + 1}
          />
        );
      })}
    </div>
  );
};

export default PaymentsDetailsPage;
