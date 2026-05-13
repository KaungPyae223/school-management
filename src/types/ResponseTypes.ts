export interface ResponseDataType {
  data: unknown[];
  meta: {
    total_data: number;
    total_pages: number;
    page: number;
    limit: number;
  };
}

export const ResponseDataSample: ResponseDataType = {
  data: [],
  meta: {
    total_data: 0,
    total_pages: 0,
    page: 0,
    limit: 0,
  },
};
