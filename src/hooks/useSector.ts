import { useQuery } from "@tanstack/react-query";
import { fetcherGET } from "../lib/fetcher";
import { BaseResponse } from "../types";

type SectorTypes = {
  uuid: string;
  code: string;
  name: string;
};

export const useListSector = (params: any) => {
  const query = useQuery<BaseResponse<SectorTypes>>({
    queryKey: ["LIST_SECTOR"],
    queryFn: async () => {
      const data = await fetcherGET("/sector/sector/", {
        ...params,
        page_size: 1000,
      });
      return data;
    },
  });

  return query;
};

export const useListSubSector = (params: any) => {
  const query = useQuery<BaseResponse<SectorTypes>>({
    queryKey: ["LIST_SUB_SECTOR", params],
    queryFn: async () => {
      const data = await fetcherGET("/sector/subsector/", {
        ...params,
        page_size: 1000,
      });
      return data;
    },
  });

  return query;
};
