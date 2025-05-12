import { create } from "zustand";

interface UserMonitoringState {
  flaggedFilter: string[];
  toggleFlaggedFilter: (key: string) => void;
}

export const useUserMonitoringStore = create<UserMonitoringState>((set) => ({
  flaggedFilter: [],
  toggleFlaggedFilter: (key: string) =>
    set((state) => ({
      flaggedFilter: state.flaggedFilter.includes(key)
        ? state.flaggedFilter.filter((k) => k !== key)
        : [...state.flaggedFilter, key],
    })),
}));
