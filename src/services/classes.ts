export const classService = {
  createClass: async (payload: any) => {
    const data = await window.api.createClass(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },
  getAllClasses: async (payload: any) => {
    const data = await window.api.getAllClasses(payload);
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  },
  updateClass: async (payload: any) => {
    const data = await window.api.updateClass(payload);
    if (!data.success) {
      throw new Error(data.error);
    }
    return data;
  },
  deleteClass: async (id: number) => {
    const data = await window.api.deleteClass(id);
    if (!data.success) {
      throw new Error(data.error);
    }
    return data;
  },

  getClassDetails: async (id: number) => {
    const data = await window.api.getClassDetails(id);
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  },
  completeClass: async (id: number) => {
    const data = await window.api.completeClass(id);
    if (!data.success) {
      throw new Error(data.error);
    }
    return data;
  },
};
