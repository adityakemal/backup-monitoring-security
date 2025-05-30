import { create } from "zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcherGET, fetcherPOST } from "../../lib/fetcher";

// Updated types based on actual API response
interface BaseResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

interface IDevice {
  id: number;
  device_identifier: string;
  device_name: string;
  description: string;
}

interface IDeviceStore {
  // loading: boolean;
}

export const useDeviceStore = create<IDeviceStore>()((set) => ({
  // loading: false,
}));

export const useGetDevice = (params: any) => {
  const query = useQuery<BaseResponse<IDevice[]>>({
    queryKey: ["LIST_DEVICE", params],
    queryFn: async () => {
      const data = await fetcherGET(`/devices/`, params);
      console.log(data);

      return data || null;
    },
  });

  return query;
};

export const useGetDeviceDetails = (params: { id: number | null }) => {
  return useQuery({
    queryKey: ["LIST_DEVICE_DETAILS", params.id],
    queryFn: async () => {
      if (!params.id) throw new Error("No device ID provided");

      const data = await fetcherGET(`/devices/${params.id}/`, {});
      return data;
    },
    enabled: !!params.id,
  });
};

// post device
export const usePostDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => fetcherPOST(`/devices/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_DEVICE"] });
    },
  });
};

export type { IDevice, BaseResponse };
