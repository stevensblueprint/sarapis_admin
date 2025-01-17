interface Response<T> {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  empty: boolean;
  contents: T[];
}

export default Response;
