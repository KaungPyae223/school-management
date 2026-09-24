import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { saveImage } from "../utils/saveImage";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { paymentRepository } from "../repository/payment.repository";
import { buildPageMeta } from "../utils/query-utils";

export const paymentIPCs = () => {
  protectedHandle("payment:index", async (_, data) => {
    try {
      const { payments, totalData } = await paymentRepository.index(data);

      return {
        error: null,
        data: payments.map((payment) => ({
          ...payment,
          studentImage: showImage(payment.studentImage),
          courseImage: showImage(payment.courseImage),
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

  protectedHandle("payment:get-by-enrollment", async (_, id) => {
    try {
      const payments = await paymentRepository.getByEnrollment(id);
      if (!payments) {
        return { error: "Payment not found", data: [] };
      }
      return {
        error: null,
        data: payments.map((payment) => ({
          ...payment,
          image: showImage(payment.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message, data: null };
    }
  });
  protectedHandle("payment:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await paymentRepository.create({
        enrollmentId: restData.enrollmentId,
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
  protectedHandle("payment:delete", async (_, id) => {
    try {
      const payment = await paymentRepository.show(id);

      if (!payment) {
        return { error: "Payment not found", data: null };
      }

      if (payment.image) {
        await deleteImage(payment.image);
      }

      await paymentRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });
};
