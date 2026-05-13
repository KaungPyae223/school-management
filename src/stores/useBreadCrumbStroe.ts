import { create } from "zustand";

type params = {
  name: string;
  link: string;
};

type UseBreadCrumbStore = {
  params: params[];
  title: string;
  setParams: (params: params[]) => void;
  setTitle: (title: string) => void;
};

const useBreadCrumbStore = create<UseBreadCrumbStore>((set) => ({
  params: [],
  title: "",
  setParams: (params) => set({ params }),
  setTitle: (title) => set({ title }),
}));

export default useBreadCrumbStore;
