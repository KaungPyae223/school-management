import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { electronStorage } from "./electronStorage";

export type TourId =
  | "dashboard"
  | "courses"
  | "courses-details"
  | "students"
  | "teachers"
  | "teachers-details"
  | "classes"
  | "payments"
  | "classes-create"
  | "classes-details"
  | "timetable"
  | "analysis"
  | "settings";
interface TourState {
  completedTours: TourId[];
  isTourCompleted: (tourId: TourId) => boolean;
  completeTour: (tourId: TourId) => void;
  resetTour: (tourId: TourId) => void;
  resetAllTours: () => void;
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      completedTours: [],

      isTourCompleted: (tourId) => get().completedTours.includes(tourId),

      completeTour: (tourId) => {
        set((state) => ({
          completedTours: state.completedTours.includes(tourId)
            ? state.completedTours
            : [...state.completedTours, tourId],
        }));
      },

      resetTour: (tourId) =>
        set((state) => ({
          completedTours: state.completedTours.filter((id) => id !== tourId),
        })),

      resetAllTours: () => {
        set({ completedTours: [] });
      },
    }),
    {
      name: "appTourStorage",
      storage: createJSONStorage(() => electronStorage),
    },
  ),
);
