import { useQuery } from "@tanstack/react-query";
import { BaseResponse } from "../types";
import { fetcherGET } from "../lib/fetcher";
import { IRole } from "../types/referral.types";

export const useListSubSector = (params: any) => {
  const query = useQuery<BaseResponse<IRole>>({
    queryKey: ["LIST_ROLE"],
    queryFn: async () => {
      const data = await fetcherGET("/reference/role/", params);
      return data;
    },
  });

  return query;
};
