export interface BaseResponse<T> {
  links: {
    next: string;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  results: T[];
}

export type ParamsType = {
  search: string;
  page: string;
  page_size: string;
};
