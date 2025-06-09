import { create } from "zustand";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetcherGET, fetcherPOST } from "../../lib/fetcher";

interface IGroup {
  id: number;
  name: string;
  description: string;
}

interface IGroupStore {
  // loading: boolean;
}

export const useGroupStore = create<IGroupStore>()((set) => ({
  // loading: false,
}));

export const useGetGroup = (params: any) => {
  const query = useQuery<BaseResponse<IGroup[]>>({
    queryKey: ["LIST_GROUP", params],
    queryFn: async () => {
      const data = await fetcherGET(`/groups/`, params);
      console.log(data);

      return data || null;
    },
    placeholderData: keepPreviousData,
  });

  return query;
};

export const useGetGroupDetails = (params: { id: number | null }) => {
  return useQuery({
    queryKey: ["LIST_GROUP_DETAILS", params.id],
    queryFn: async () => {
      if (!params.id) throw new Error("No group ID provided");

      const data = await fetcherGET(`/groups/${params.id}/`, {});
      return data;
    },
    enabled: !!params.id,
  });
};

// post group
export const usePostGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => fetcherPOST(`/groups/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_GROUP"] });
    },
  });
};

export type { IGroup };
