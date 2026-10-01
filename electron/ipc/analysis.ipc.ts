import { protectedHandle } from "../auth/ipc/protected.ipc";
import { prisma } from "../db/prisma";
import { dashboardRepository } from "../repository/analysis.repository";
import { buildSkip } from "../utils/query-utils";
import { showImage } from "../utils/showImage";

export const analysisIPCs = () => {
  protectedHandle("analysis:schedule-utilization", async (_) => {
    try {
      const result = await dashboardRepository.schedule_utilization();
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("analysis:age-demographics", async (_) => {
    try {
      const { genderCounts, ageGroupCounts } =
        await dashboardRepository.age_demographics();

      return {
        genderCounts,
        ageGroupCounts,
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("analysis:enrollment-retention", async (_) => {
    try {
      const result = await dashboardRepository.retention();

      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("analysis:courses", async (_, data) => {
    try {
      const result = await dashboardRepository.courses(data);

      return {
        data: result.map((course) => ({
          ...course,
          courseImage: showImage(course.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("analysis:teacher-revenue", async (_) => {
    try {
      const result = await dashboardRepository.teacherRevenue();

      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("analysis:teacher-workload", async (_, data) => {
    try {
      const result = await dashboardRepository.teacherWorkload(data);

      return {
        data: result.map((teacher) => ({
          ...teacher,
          teacherImage: showImage(teacher.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
};
