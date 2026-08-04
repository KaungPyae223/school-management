export const paymentService = {
  createPayment: async (payload: any) => {
    const data = await window.api.createPayment(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  getAllPayments: async (payload: any) => {
    const data = await window.api.getAllPayments(payload);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  getAllPaymentsByEnrollment: async (id: number) => {
    const data = await window.api.getAllPaymentsByEnrollment(id);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deletePayment: async (id: number) => {
    const data = await window.api.deletePayment(id);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },
};
