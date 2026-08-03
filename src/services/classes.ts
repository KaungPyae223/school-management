export const classesService = {
  createClass: async (payload: any) => {
    const res = await window.api.createClass(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
  getAllClasses: async (payload: any) => {
    const res = await window.api.getAllClasses(payload);
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  },
  updateClass: async (payload: any) => {
    const res = await window.api.updateClass(payload);
    if (!res.success) {
      throw new Error(res.error);
    }
    return res;
  },
  deleteClass: async (id: number) => {
    const res = await window.api.deleteClass(id);
    if (!res.success) {
      throw new Error(res.error);
    }
    return res;
  },
  getClass: async (id: number) => {
    const res = await window.api.getClass(id);
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  },
  completeClass: async (id: number) => {
    const res = await window.api.completeClass(id);
    if (!res.success) {
      throw new Error(res.error);
    }
    return res;
  },
};
