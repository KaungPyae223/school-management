import { useAppQuery } from "../../../../hooks/use-app-query";
import { dashboardService } from "../../../../services/dashboard";

export const useGetKpi = () => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["dashboard"],

    queryFn: async () => {
      const [
        kpi,
        revenueEnrollment,
        courseEnrollment,
        todayClasses,
        totalPendingAmount,
      ] = await Promise.all([
        dashboardService.getKPI(),
        dashboardService.getRevenueEnrollment(),
        dashboardService.getCoursesEnrollments(),
        dashboardService.getTodayClasses(),
        dashboardService.getTotalPendingAmount(),
      ]);

      return {
        kpi,
        revenueEnrollment,
        courseEnrollment,
        todayClasses,
        totalPendingAmount,
      };
    },
  }) as {
    data: {
      kpi: any;
      revenueEnrollment: any[];
      courseEnrollment: any[];
      todayClasses: any[];
      totalPendingAmount: number;
    };
    isLoading: boolean;
    error: any;
  };

  return { data, isLoading, error };
};
