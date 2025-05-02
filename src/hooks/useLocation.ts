import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetcherDelete,
  fetcherGET,
  fetcherPOST,
  fetcherPUT,
} from "../lib/fetcher";
import { BaseResponse } from "../types";
import { ILocation } from "../types/referral.types";

export const useListProvince = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_PROVINCE"],
    queryFn: async () => {
      const data = await fetcherGET("/location/province/", {
        ...params,
        page_size: 100,
      });
      return data;
    },
  });

  return query;
};

export const useListCity = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_CITY", params],
    enabled: !!params.province,
    queryFn: async () => {
      const data = await fetcherGET("/location/city/", {
        ...params,
        page_size: 100,
      });
      return data;
    },
  });

  return query;
};

export const useListDistrict = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_DISTRICT", params],
    enabled: !!params.city,
    queryFn: async () => {
      const data = await fetcherGET("/location/district/", {
        ...params,
        page_size: 100,
      });
      return data;
    },
  });

  return query;
};

export const useListSubDistrict = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_SUBDISTRICT", params],
    enabled: !!params.district,
    queryFn: async () => {
      const data = await fetcherGET("/location/subdistrict/", {
        ...params,
        page_size: 100,
      });
      return data;
    },
  });

  return query;
};

export const useListBranch = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_BRANCH", params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET("/location/branch/", params);
      return data;
    },
  });

  return query;
};

export const useListRegion = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_REGION"],
    queryFn: async () => {
      const data = await fetcherGET("/location/region/", params);
      return data;
    },
  });

  return query;
};

export const useListUnit = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_UNIT", params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET("/location/unit/", params);
      return data;
    },
  });

  return query;
};

export const useListMbm = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_MBM", params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET("/location/mbm/", params);
      return data;
    },
  });

  return query;
};

export const useListMbam = (params: any) => {
  const query = useQuery<BaseResponse<ILocation>>({
    queryKey: ["LIST_MBAM", params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET("/location/mbam/", params);
      return data;
    },
  });

  return query;
};

// Create location
export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, ...data }: any) =>
      fetcherPOST(`/location/${type}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROVINCE"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_CITY"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_DISTRICT"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_SUBDISTRICT"] });
    },
  });
};

// Update location
export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, uuid, ...data }: any) =>
      fetcherPUT(`/location/${type}/${uuid}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROVINCE"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_CITY"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_DISTRICT"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_SUBDISTRICT"] });
    },
  });
};

// Delete location
export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, uuid }: any) =>
      fetcherDelete(`/location/${type}/${uuid}/`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROVINCE"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_CITY"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_DISTRICT"] });
      queryClient.invalidateQueries({ queryKey: ["LIST_SUBDISTRICT"] });
    },
  });
};
