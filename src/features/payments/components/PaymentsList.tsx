import {
  BookOpen,
  CreditCard,
  DollarSign,
  Hash,
  Mail,
  Phone,
} from "lucide-react";
import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableRow from "../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useGetSelectedColumns } from "../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../types/TableHeader";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import TableIconContent from "../../../components/table/TableIconContent";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import TableActionButton from "../../../components/table/TableActionButton";
import { useNavigate } from "react-router";

const PaymentsList = ({
  data,
  view,
}: {
  data: any;
  view: "initial" | "all";
}) => {
  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Course",
    "Price",
    "Phone",
    "Paid Amount",
    "Remaining Amount",
    "Payment Times",
  ]);

  const headers: TableHeadType[] = [
    {
      title: "Name",
      key: "name",
      sortable: true,
      sortKey: "studentName",
    },
    {
      title: "Course",
      key: "course",
      sortable: true,
      sortKey: "courseName",
    },
    {
      title: "Email",
      key: "email",
      sortable: true,
      sortKey: "studentEmail",
    },
    {
      title: "Phone",
      key: "phone",
      sortable: true,
      sortKey: "studentPhone",
    },
    {
      title: "Price",
      key: "price",
      sortable: true,
      sortKey: "e.price",
      align: "right",
    },
    {
      title: "First Paid Date",
      key: "first_paid_date",
      sortable: true,
      sortKey: "firstPaidAt",
    },
    {
      title: "Last Paid Date",
      key: "last_paid_date",
      sortable: true,
      sortKey: "lastPaidAt",
    },
    ...(view === "initial"
      ? [
          {
            title: "Paid Amount",
            key: "paidAmount",
            sortable: true,
            sortKey: "paidAmount",
            align: "right" as const,
          },
          {
            title: "Remaining Amount",
            key: "remainingAmount",
            sortable: true,
            sortKey: "remainingAmount",
            align: "right" as const,
          },
        ]
      : []),
    {
      title: "Payment Times",
      key: "paymentTimes",
      sortable: true,
      sortKey: "paymentTimes",
      align: "right",
    },
  ];

  const navigate = useNavigate();

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
                {payment.courseImage ? (
                  <img
                    src={payment.courseImage}
                    alt={payment.courseName}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-foreground/50 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <BookOpen size={20} className="text-background" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">
                    {payment.courseName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Batch {payment.batch}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell hidden={!selectedColumns.includes("Email")}>
              <TableIconContent icon={Mail} value={payment.studentEmail} />
            </TableCell>
            <TableCell hidden={!selectedColumns.includes("Phone")}>
              <TableIconContent icon={Phone} value={payment.studentPhone} />
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
            {view == "initial" && (
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
                  onClick={() => {
                    navigate(`/payments/${payment.id}`);
                  }}
                  variant={payment.remainingAmount > 0 ? "default" : "outline"}
                  icon={CreditCard}
                  tooltip="View payment details"
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
