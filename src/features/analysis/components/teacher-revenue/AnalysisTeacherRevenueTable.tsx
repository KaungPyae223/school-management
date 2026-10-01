import { formatCurrency } from "../../../../utils/format-currency";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const AnalysisTeacherRevenueTable = ({ formattedData }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-x-auto  border rounded-lg">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b  text-xs font-medium text-muted-foreground">
            <th className="py-2.5 pl-3 pr-4 font-medium border-r">
              {t("analysis.teacherRevenue.teacher")}
            </th>
            <th className="py-2.5 px-3 text-right font-medium border-r  whitespace-nowrap">
              {t("analysis.teacherRevenue.totalRevenue")}
            </th>

            <th className="py-2.5 pl-3 pr-3 text-right font-medium whitespace-nowrap">
              {t("analysis.teacherRevenue.totalEnrollments")}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {formattedData.map((entry) => (
            <tr key={entry.id} className="transition-colors hover:bg-muted/50">
              {/* Color Dot + Teacher Name */}
              <td className="py-2.5 pl-3 pr-4 border-r">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-background"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium text-foreground">
                    {entry.name}
                  </span>
                </div>
              </td>

              {/* Revenue */}
              <td className="py-2.5 px-3 border-r  text-right tabular-nums font-semibold text-foreground whitespace-nowrap">
                {replaceLocalDigit(formatCurrency(entry.total_revenue))}
              </td>

              {/* Enrollments */}
              <td className="py-2.5 pl-3 pr-3 text-right tabular-nums font-semibold text-foreground whitespace-nowrap">
                {replaceLocalDigit(entry.total_enrollments)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisTeacherRevenueTable;
