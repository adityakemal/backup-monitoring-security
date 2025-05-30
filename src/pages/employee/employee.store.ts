import { create } from "zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcherGET, fetcherPOST } from "../../lib/fetcher";
// import { fetcherPOST } from "../../lib/fetcher";

// Updated types based on actual API response
interface BaseResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

interface IGroup {
  id: number;
  name: string;
  description: string;
}

interface IDevice {
  id: number;
  device_identifier: string;
  device_name: string;
  description: string;
}

interface IEmployee {
  id: number;
  full_name: string;
  groups: IGroup[];
}

export interface IEmployeeDetail extends IEmployee {
  devices: IDevice[];
}

interface IEmployeeStore {
  // loading: boolean;
  // postChangePassword: (params?: any, signal?: any) => void;
}

export const useEmployeeStore = create<IEmployeeStore>()((set) => ({
  // loading: false,
  // postChangePassword: async (body) => {
  //   set({ loading: true });
  //   try {
  //     const data = await fetcherPOST(`/auth/change-password/`, body);
  //     console.log(data);
  //     set({
  //       loading: false,
  //     });
  //     return Promise.resolve(data);
  //   } catch (error: any) {
  //     console.log(error.message, "error zustand");
  //     set({ loading: false });
  //     return Promise.reject(error);
  //   }
  // },
}));

export const useGetEmployee = (params: any) => {
  const query = useQuery<BaseResponse<IEmployee[]>>({
    queryKey: ["LIST_EMPLOYEE", params],
    queryFn: async () => {
      const data = await fetcherGET(`/employees/`, params);
      console.log(data);

      return data || null;
    },
  });

  return query;
};

export const useGetEmployeeDetails = (params: { id: number | null }) => {
  return useQuery({
    queryKey: ["LIST_EMPLOYEE_DETAILS", params.id],
    queryFn: async () => {
      if (!params.id) throw new Error("No employee ID provided");

      const data = await fetcherGET(`/employees/${params.id}/`, {});
      return data;
    },
    enabled: !!params.id,
  });
};

// post referral
export const usePostEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => fetcherPOST(`/employees/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_EMPLOYEE"] });
    },
  });
};
