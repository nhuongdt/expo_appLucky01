export interface IPageResult<T> {
  totalCount: number;
  totalPage: number;
  items: T[];
}
