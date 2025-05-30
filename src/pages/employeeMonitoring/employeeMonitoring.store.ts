import { create } from "zustand";

interface IEmployeeMonitoringState {
  flaggedFilter: string[];
  toggleFlaggedFilter: (key: string) => void;
}

export const employeeMonitoringStore = create<IEmployeeMonitoringState>(
  (set) => ({
    flaggedFilter: [],
    toggleFlaggedFilter: (key: string) =>
      set((state) => ({
        flaggedFilter: state.flaggedFilter.includes(key)
          ? state.flaggedFilter.filter((k) => k !== key)
          : [...state.flaggedFilter, key],
      })),
  })
);
