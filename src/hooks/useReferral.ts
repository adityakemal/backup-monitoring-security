import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetcherGET, fetcherPOST } from "../lib/fetcher";
import { BaseResponse } from "../types";
import {
  IAggregator,
  IAggregatorReferralByStatus,
  IDetailReferral,
  IReferral,
  IReferralCategoryTop5,
} from "../types/referral.types";

export const useGetReferral = (params: any) => {
  const query = useQuery<BaseResponse<IReferral>>({
    queryKey: ["LIST_REFERRAL", params],
    queryFn: async () => {
      const data = await fetcherGET("/referral/referral/", params);
      console.log(data);

      return data || null;
    },
  });

  return query;
};

export const useGetDetailReferral = ({ id32 }: any) => {
  const query = useQuery<IDetailReferral>({
    queryKey: ["DETAIL_REFERRAL"],
    queryFn: async () => {
      const data = await fetcherGET(`/referral/referral/${id32}/`, {});
      console.log(data);

      return data || null;
    },
  });

  return query;
};

// post referral
export const usePostReferral = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => fetcherPOST(`/referral/referral/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_REFERRAL"] });
    },
  });
};

// post referral visit
export const usePostCreateVisitReferral = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      fetcherPOST(`/referral/referral/${body?.id32}/create-visit/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_REFERRAL"] });
    },
  });
};

export const useGetReferralCategoryTopFive = (params: any) => {
  const query = useQuery<IReferralCategoryTop5[]>({
    queryKey: ["LIST_CATEGORY_REFERRAL_TOP_5", params],
    queryFn: async () => {
      const data = await fetcherGET(
        `/referral/monitoring/top-5-sectors/`,
        params
      );
      console.log(data);

      return data || null;
    },
  });

  return query;
};

export const useGetAggregatorReferralByStatus = (params: any) => {
  const query = useQuery<IAggregatorReferralByStatus>({
    queryKey: ["AGGREGATOR_REFERRAL_BY_STATUS", params],
    queryFn: async () => {
      const data = await fetcherGET(
        `/referral/monitoring/aggregator-by-status/`,
        params
      );
      console.log(data);

      return data || null;
    },
  });

  return query;
};

export const useGetAggregator = (params: any) => {
  const query = useQuery<BaseResponse<IAggregator[]>>({
    queryKey: ["AGGREGATOR_REFERRAL", params],
    queryFn: async () => {
      const data = await fetcherGET(`/referral/monitoring/aggregator/`, params);
      console.log(data);

      return data || null;
    },
  });

  return query;
};

// DOWNLOAD referral visit
export const useDownloadRefferal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => fetcherGET(`/referral/referral/download/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DOWNLOAD_REFFERAL"] });
    },
  });
};

export const useUploadReferralBulk = () => {
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body: any) => {
      const response = await fetcherPOST("/referral/referral/bulk/", body);
      console.log(response);
      return response;
    },
  });

  return mutation;
};

// //CHECK STATUS
export const useReferralCheckStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, any>({
    mutationFn: async () => {
      const response = await fetcherPOST("/common/bulk-create-status/", {
        action: "referral",
      });
      console.log(response);
      return response;
    },
    onSuccess: async (data) => {
      if (!data.is_done) {
        // Delay for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
        mutation.mutate({}); // Call mutate again with the same data
      } else {
        // Handle success when isDone is true
        queryClient.invalidateQueries({ queryKey: ["LIST_REFERRAL"] });
        console.log("Operation completed successfully!");
      }
    },
  });
  return mutation;
};

// export const useReferralCheckStatus = (params: any) => {
//   const query = useQuery<any, AxiosError>({
//     queryKey: ["STATUS_BULK_REFERRAL", { ...params, action: "referral" }],
//     queryFn: async () => {
//       try {
//         const response = await fetcherPOST("/common/bulk-create-status/", {
//           action: "referral",
//         });
//         console.log(response, "response");
//         return response;
//       } catch (error: any) {
//         return Promise.reject(error);
//       }
//     },
//   });

//   return query;
// };
