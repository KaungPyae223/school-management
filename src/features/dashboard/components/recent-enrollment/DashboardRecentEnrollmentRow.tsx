import { useNavigate } from "react-router";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { Badge } from "../../../../components/ui/badge";
import { formatCurrency } from "../../../../utils/format-currency";
import TableIconContent from "../../../../components/table/TableIconContent";
import { getRelativeTime } from "../../../../utils/get-relative-time";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import { Clock } from "lucide-react";

const DashboardRecentEnrollmentRow = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  return (
    <TableRow key={data.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={data.student_image} alt={data.student_name} />
            <AvatarFallback>
              {generateImageFallBack(data.student_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-foreground">{data.student_name}</p>
            <span className="text-xs text-muted-foreground">
              {replaceLocalDigit(data.student_phone)}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-foreground truncate">
            {data.course_name}
          </p>
          <Badge variant="outline" className="text-[10px] px-2 py-0 font-mono">
            B-{data.batch}
          </Badge>
        </div>
      </TableCell>

      <TableCell align="right">
        <p className="font-semibold">
          {replaceLocalDigit(formatCurrency(data.price))}
        </p>
        <p className="text-xs text-muted-foreground">
          {data.paymentStatus === "partial"
            ? `Paid: ${formatCurrency(data.paidAmount)}`
            : "Per course"}
        </p>
      </TableCell>

      <TableCell align="right">
        <TableIconContent
          icon={Clock}
          value={getRelativeTime(data.createdAt)}
          align="right"
          className="text-muted-foreground text-sm"
        />
      </TableCell>

      <TableCell className="py-4 pl-3  text-right ">
        <TableActionButtonsContainer
          onView={() => navigate(`/students/details/${data.id}`)}
        />
      </TableCell>
    </TableRow>
  );
};

export default DashboardRecentEnrollmentRow;
