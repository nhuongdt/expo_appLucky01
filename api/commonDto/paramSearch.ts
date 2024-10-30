export interface IParamSearchDto {
  idChiNhanhs?: string[];
  textSearch?: string;
  currentPage?: number;
  pageSize?: number;
  columnSort?: string;
  typeSort?: string;
  trangThais?: number[];
}
