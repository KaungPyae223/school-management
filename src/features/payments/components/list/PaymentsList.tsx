import { BookOpen, CreditCard, DollarSign, Hash, Mail, Phone } from "lucide-react";
import Table from "../../../../components/table/Table";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableRow from "../../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import TableIconContent from "../../../../components/table/TableIconContent";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableActionButton from "../../../../components/table/TableActionButton";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { usePaymentsList } from "../../hooks/list/usePaymentsList";

interface PaymentsListProps {
  data: any;
  view: "initial" | "all";
}

const PaymentsList = ({ data, view }: PaymentsListProps) => {
  const { headers, selectedColumns, navigate, t } = usePaymentsList(view);

  return (
    <Table>
      <TableHeaderGenerator
        headers={headers}
        selectedColumns={selectedColumns}
        prefix="e."
      />
      <TableBody>
        {data.map((payment: any) => (
          <TableRow key={payment.id}>
            <TableCell hidden={!selectedColumns.includes("Name")}>
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage src={payment.studentImage} />
                  <AvatarFallback>
                    {generateImageFallBack(payment.studentName)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium text-foreground">
                  {payment.studentName}
                </p>
              </div>
            </TableCell>

            <TableCell hidden={!selectedColumns.includes("Name")}>
              <div className="flex items-center gap-3">
                <ImageDisplay
                  image={payment.courseImage}
                  alt={payment.courseName}
                  fallbackIcon={BookOpen}
                  display="list"
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">
                    {payment.courseName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("classes.batch", {
                      batch: replaceLocalDigit(payment.batch),
                    })}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell hidden={!selectedColumns.includes("Email")}>
              <TableIconContent icon={Mail} value={payment.studentEmail} />
            </TableCell>

            <TableCell hidden={!selectedColumns.includes("Phone")}>
              <TableIconContent
                icon={Phone}
                value={replaceLocalDigit(payment.studentPhone)}
              />
            </TableCell>

            <TableCell
              hidden={!selectedColumns.includes("Price")}
              align="right"
            >
              <TableIconContent
                icon={DollarSign}
                value={formatCurrency(payment.price)}
                align="right"
              />
            </TableCell>

            <TableCell
              hidden={!selectedColumns.includes("First Paid Date")}
              align="right"
            >
              {formatDate(new Date(payment.firstPaidAt))}
            </TableCell>

            <TableCell
              hidden={!selectedColumns.includes("Last Paid Date")}
              align="right"
            >
              {formatDate(new Date(payment.lastPaidAt))}
            </TableCell>

            {view === "initial" && (
              <>
                <TableCell
                  hidden={!selectedColumns.includes("Paid Amount")}
                  align="right"
                >
                  {formatCurrency(payment.paidAmount)}
                </TableCell>
                <TableCell
                  hidden={!selectedColumns.includes("Remaining Amount")}
                  align="right"
                >
                  {formatCurrency(payment.remainingAmount)}
                </TableCell>
              </>
            )}

            <TableCell
              hidden={!selectedColumns.includes("Payment Times")}
              align="right"
            >
              <TableIconContent
                icon={Hash}
                value={payment.paymentTimes}
                align="right"
              />
            </TableCell>

            <TableCell hidden={!selectedColumns.includes("Created At")}>
              {formatDate(payment.createdAt)}
            </TableCell>

            <TableCell hidden={!selectedColumns.includes("Updated At")}>
              {formatDate(payment.updatedAt)}
            </TableCell>

            <TableCell>
              <TableActionButtonsContainer>
                <TableActionButton
                  onClick={() => navigate(`/payments/${payment.id}`)}
                  variant={payment.remainingAmount > 0 ? "default" : "outline"}
                  icon={CreditCard}
                  tooltip={t("payments.viewPaymentDetails")}
                />
              </TableActionButtonsContainer>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentsList;
