import { create } from "zustand";
import dayjs from "dayjs";

interface DashboardStore {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  setDateRange: (dates: [dayjs.Dayjs, dayjs.Dayjs]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dateRange: [dayjs().subtract(7, "day"), dayjs()],
  setDateRange: (dates) => set({ dateRange: dates }),
}));
