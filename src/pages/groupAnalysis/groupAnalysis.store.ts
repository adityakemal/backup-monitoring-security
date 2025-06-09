import { keepPreviousData } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

import { fetcherGET } from "../../lib/fetcher";
// import { AnalyticsEmployeeDailyInsight } from "../../types/analytics.type"; /

interface IGroupAnalysisState {
  //   selectedEmployee: string[];
  //   toggleSelectedEmployee: (key: string) => void;
}

export const groupAnalysisStore = create<IGroupAnalysisState>((set) => ({
  // selectedEmployee: [],
  // toggleSelectedEmployee: (key: string) =>
  //   set((state) => ({
  //     selectedEmployee: state.selectedEmployee.includes(key)
  //       ? state.flaggedFilter.filter((k) => k !== key)
  //       : [...state.flaggedFilter, key],
  //   })),
}));

export const useGetGroupAnalyticDailyInsight = (params: any) => {
  const query = useQuery<BaseResponse<any[]>>({
    queryKey: ["LIST_GROUP_ANALYTIC_DAILY_INSIGHT", params],
    queryFn: async () => {
      const data = await fetcherGET(`/analysis/group-daily-insights/`, params);
      console.log(data);

      return data || null;
    },
    placeholderData: keepPreviousData,
  });

  return query;
};
