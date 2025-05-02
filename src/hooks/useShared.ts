import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcherGET, fetcherPOST } from "../lib/fetcher";
import { IRefference, IRole } from "../types/referral.types";

export const useListRole = (params: any) => {
  const query = useQuery<IRole[]>({
    queryKey: ["LIST_ROLE"],
    queryFn: async () => {
      const data = await fetcherGET("/reference/role/", { params });
      console.log(data);

      return data.results || [];
    },
  });

  return query;
};

export const useProduct = () => {
  const query = useQuery<IRefference[]>({
    queryKey: ["LIST_PRODUCT"],
    queryFn: async () => {
      const data = await fetcherGET("/product/product/", {});
      console.log(data);

      return data;
    },
  });

  return query;
};

export const useListBank = () => {
  const query = useQuery<IRefference[]>({
    queryKey: ["LIST_BANK"],
    queryFn: async () => {
      const data = await fetcherGET("/reference/bank/", { page_size: 500 });
      console.log(data);

      return data?.results || [];
    },
  });

  return query;
};

export const usePostFileToUrl = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => fetcherPOST(`/common/file/`, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["DOWNLOAD_REFFERAL"] });
    },
  });
};
