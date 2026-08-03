export const paymentService = {
  getAllPayments: async (data: any) => {
    const res = await window.api.getAllPayments(data);

    if (res.error) {
      throw new Error(res.error);
    }

    return res;
  },

  getAllPaymentsByEnrollment: async (id: number) => {
    const res = await window.api.getAllPaymentsByEnrollment(id);

    if (res.error) {
      throw new Error(res.error);
    }

    return res;
  },
};
