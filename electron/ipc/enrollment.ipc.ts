import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { buildPageMeta } from "../utils/query-utils";
import { enrollmentRepository } from "../repository/enrollment.repository";
import { paymentRepository } from "../repository/payment.repository";
import { deleteImage } from "../utils/deleteImage";

export const enrollmentIPCs = () => {
  protectedHandle("enrollment:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      const checkExistingEnrollment = await enrollmentRepository.findExisting(
        restData.studentId,
        restData.classId,
      );

      if (checkExistingEnrollment) {
        return { success: false, error: "Enrollment already exists" };
      }

      const checkClass = await enrollmentRepository.findClassById(
        restData.classId,
      );

      if (!checkClass) {
        return { success: false, error: "Class not found" };
      }

      if (
        generateStatus(checkClass.startDate, checkClass.endDate) === "complete"
      ) {
        return { success: false, error: "Class is finished" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      const enrollment = await enrollmentRepository.create({
        studentId: restData.studentId,
        classId: restData.classId,
        price: restData.price,
      });

      await enrollmentRepository.createPayment({
        enrollmentId: enrollment.id,
        amount: Number(restData.amount),
        image: imageUrl,
        description: restData.description,
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("enrollment:show", async (_, id) => {
    try {
      const enrollment = await enrollmentRepository.show(id);
      return {
        data: {
          ...enrollment,
          courseImage: showImage(enrollment?.class?.course.image),
          studentImage: showImage(enrollment?.student.image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("enrollment:delete", async (_, id) => {
    try {
      const payments = await paymentRepository.getByEnrollment(id);

      payments.map((payment: any) => {
        if (payment.image) {
          deleteImage(payment.image);
        }
      });

      await enrollmentRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("enrollment:toggleWithdraw", async (_, id: number) => {
    try {
      const enrollment = await enrollmentRepository.findById(id);

      if (!enrollment) {
        return { success: false, error: "Enrollment not found" };
      }

      const updatedEnrollment = await enrollmentRepository.updateWithdraw(
        Number(id),
        !enrollment.withdrawn,
      );

      return { success: true, data: updatedEnrollment };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("enrollment:getEnrollmentByClass", async (_, data) => {
    try {
      const { enrollments, totalData } =
        await enrollmentRepository.getEnrollmentByClass(data);

      return {
        error: null,
        data: enrollments.map((enrollment) => ({
          ...enrollment,
          image: showImage(enrollment.studentImage),
        })),
        meta: buildPageMeta(totalData, data.page, data.limit),
      };
    } catch (error: any) {
      console.error(error);
      return {
        error: error.message,
        data: [],
        meta: buildPageMeta(),
      };
    }
  });
};
