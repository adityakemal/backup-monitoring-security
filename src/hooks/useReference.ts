import { useQuery } from '@tanstack/react-query';
import { fetcherGET } from '../lib/fetcher';

export const useDowloadExampleUserBulk = (params: any) => {
  const query = useQuery({
    queryKey: ['DOWNLOAD_BULK', params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET('/reference/bulk-create-user-template/', {
        ...params,
      });
      return data;
    },
  });

  return query;
};
