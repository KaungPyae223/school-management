import { showImage } from "../utils/showImage";

import { protectedHandle } from "../auth/ipc/protected.ipc";
import { dashboardRepository } from "../repository/dashboard.repository";

export const dashboardIPCs = () => {
  protectedHandle("dashboard:kpi", async () => {
    try {
      const result = await dashboardRepository.kpi();
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:revenue-enrollments", async () => {
    try {
      const result = await dashboardRepository.revenueEnrollments();
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:courses-enrollments", async () => {
    try {
      const result = await dashboardRepository.coursesEnrollments();
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:today-classes", async () => {
    try {
      const result = await dashboardRepository.todayClasses();
      return result.map((item: any) => ({
        ...item,
        teacher_image: showImage(item.teacher_image),
      }));
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:recent-enrollment", async (_, data) => {
    try {
      const result = await dashboardRepository.recentEnrollments(data);

      return {
        data: result.map((item: any) => ({
          ...item,
          student_image: showImage(item.student_image),
          course_image: showImage(item.course_image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:recent-payment", async (_, data) => {
    try {
      const result = await dashboardRepository.recentPayments(data);

      return {
        data: result.map((item: any) => ({
          ...item,
          student_image: showImage(item.student_image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:get-total-pending-amount", async () => {
    try {
      const result = await dashboardRepository.totalPendingAmount();
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
};
