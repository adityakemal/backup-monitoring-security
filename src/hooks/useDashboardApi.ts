import { useQuery } from "@tanstack/react-query";
import { fetcherGET } from "../lib/fetcher";
import { DashboardApiResponse } from "../types/dashboard.type";

export const useDashboardData = (params?: any) => {
  const query = useQuery<DashboardApiResponse>({
    queryKey: ["DASHBOARD_DATA", params],
    queryFn: async () => {
      const data = await fetcherGET("/dashboard/", { ...params });
      return data;
    },
  });

  return query;
};

// Hook untuk data spesifik jika diperlukan
// export const useDashboardSummary = () => {
//   const query = useQuery<BaseResponse<DashboardData>>({
//     queryKey: ["DASHBOARD_SUMMARY"],
//     queryFn: async () => {
//       const data = await fetcherGET("/dashboard/summary/", {});
//       return data;
//     },
//   });

//   return query;
// };

// Hook untuk data realtime jika diperlukan
// export const useDashboardRealtime = (params?: any) => {
//   const query = useQuery<BaseResponse<DashboardData>>({
//     queryKey: ["DASHBOARD_REALTIME", params],
//     queryFn: async () => {
//       const data = await fetcherGET("/dashboard/realtime/", { ...params });
//       return data;
//     },
//     // Refresh setiap 30 detik
//     refetchInterval: 30000,
//   });

//   return query;
// };
