interface BaseResponse<T> {
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  results: T;
}
