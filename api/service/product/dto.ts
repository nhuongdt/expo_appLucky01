import { IParamSearchDto } from "../../commonDto/paramSearch";

export interface IProductBasic {
  idHangHoa: string;
  idDonViQuyDoi: string;
  maHangHoa: string;
  tenHangHoa: string;
  giaBan: number;
  tyLeChuyenDoi?: number;
  tenNhomHang?: string;
}
export interface IParamSearchProductDto extends IParamSearchDto {
  idNhomHangHoas?: string[];
}

export class ProductBasicto implements IProductBasic {
  idHangHoa: string;
  idDonViQuyDoi: string;
  maHangHoa: string;
  tenHangHoa: string;
  giaBan: number;
  tyLeChuyenDoi?: number;
  tenNhomHang?: string;
  constructor({
    idHangHoa = "",
    idDonViQuyDoi = "",
    maHangHoa = "",
    tenHangHoa = "",
    giaBan = 0,
  }) {
    this.idHangHoa = idHangHoa;
    this.idDonViQuyDoi = idDonViQuyDoi;
    this.maHangHoa = maHangHoa;
    this.tenHangHoa = tenHangHoa;
    this.giaBan = giaBan;
  }
}
