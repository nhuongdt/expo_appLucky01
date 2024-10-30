import { IProductBasic } from "@/api/service/product/dto";
import { InvoiceStatus } from "@/enum/InvoiceStatus";
import { LoaiChungTu } from "@/enum/LoaiChungTu";
import { format } from "date-fns";
import { ICustomerBasic } from "../customer/dto";

export interface IHoaDonDto extends ICustomerBasic {
  id: string;
  idLoaiChungTu: number;
  idChiNhanh: string;
  idKhachHang: string | null;
  idNhanVien: string | null;
  maHoaDon: string;
  ngayLapHoaDon: string;

  tongTienHangChuaChietKhau: number;
  ptChietKhauHang: number;
  tongChietKhauHangHoa: number;
  tongTienHang: number;
  ptThueHD: number;
  tongTienThue: number;
  tongTienHDSauVAT: number;
  pTGiamGiaHD: number;
  tongGiamGiaHD: number;
  chiPhiTraHang: number;
  tongThanhToan: number;
  chiPhiHD: number;
  ghiChuHD: string;
  trangThai: number;
}

export interface IHoaDonChiTietDto extends IProductBasic {
  id: string;
  idHoaDon: string;
  stt: number;
  soLuong: number;
  donGiaTruocCK: number;
  ptChietKhau?: number;
  tienChietKhau?: number;
  laPTChietKhau?: boolean;
  donGiaSauCK: number;
  thanhTienTruocCK: number;
  thanhTienSauCK: number;
  ptThue?: number;
  tienThue?: number;
  donGiaSauVAT: number;
  thanhTienSauVAT: number;
  ghiChu?: string;
  trangThai: number;
}

export class HoaDonDto implements IHoaDonDto {
  id: string;
  idLoaiChungTu: number;
  idKhachHang: string | null;
  idChiNhanh: string;
  idNhanVien: string | null;
  maHoaDon: string;
  ngayLapHoaDon: string;

  tongTienHangChuaChietKhau: number;
  ptChietKhauHang: number;
  tongChietKhauHangHoa: number;
  tongTienHang: number;
  ptThueHD: number;
  tongTienThue: number;
  tongTienHDSauVAT: number;
  pTGiamGiaHD: number;
  tongGiamGiaHD: number;
  chiPhiTraHang: number;
  tongThanhToan: number;
  chiPhiHD: number;
  ghiChuHD: string;
  trangThai: number;

  maKhachHang: string;
  tenKhachHang: string;
  soDienThoai: string;

  constructor({
    id = "",
    idLoaiChungTu = LoaiChungTu.HOA_DON_BAN_LE,
    idChiNhanh = "",
    idKhachHang = null,
    idNhanVien = null,
    maHoaDon = "",
    ngayLapHoaDon = format(new Date(), "yyyy-MM-dd HH:mm"),
    tongTienHangChuaChietKhau = 0,
    ptChietKhauHang = 0,
    tongChietKhauHangHoa = 0,
    tongTienHang = 0,
    ptThueHD = 0,
    tongTienThue = 0,
    tongTienHDSauVAT = 0,
    pTGiamGiaHD = 0,
    tongGiamGiaHD = 0,
    chiPhiTraHang = 0,
    tongThanhToan = 0,
    chiPhiHD = 0,
    ghiChuHD = "",
    trangThai = InvoiceStatus.HOAN_THANH,

    maKhachHang = "KL",
    tenKhachHang = "Khách lẻ",
    soDienThoai = "",
  }) {
    this.id = id;
    this.idLoaiChungTu = idLoaiChungTu;
    this.idChiNhanh = idChiNhanh;
    this.idKhachHang = idKhachHang;
    this.idNhanVien = idNhanVien;

    this.maHoaDon = maHoaDon;
    this.ngayLapHoaDon = ngayLapHoaDon;
    this.tongTienHangChuaChietKhau = tongTienHangChuaChietKhau;
    this.ptChietKhauHang = ptChietKhauHang;
    this.tongChietKhauHangHoa = tongChietKhauHangHoa;
    this.tongTienHang = tongTienHang;
    this.ptThueHD = ptThueHD;
    this.tongTienThue = tongTienThue;
    this.tongTienHDSauVAT = tongTienHDSauVAT;
    this.pTGiamGiaHD = pTGiamGiaHD;
    this.tongGiamGiaHD = tongGiamGiaHD;
    this.chiPhiTraHang = chiPhiTraHang;
    this.tongThanhToan = tongThanhToan;
    this.chiPhiHD = chiPhiHD;
    this.ghiChuHD = ghiChuHD;
    this.trangThai = trangThai;

    this.maKhachHang = maKhachHang;
    this.tenKhachHang = tenKhachHang;
    this.soDienThoai = soDienThoai;
  }
}
export class HoaDonChiTietDto implements IHoaDonChiTietDto {
  id: string;
  idHoaDon: string;
  stt: number;
  soLuong: number;
  donGiaTruocCK: number;
  ptChietKhau?: number;
  tienChietKhau?: number;
  laPTChietKhau?: boolean;
  donGiaSauCK: number;
  thanhTienTruocCK: number;
  thanhTienSauCK: number;
  ptThue?: number;
  tienThue?: number;
  donGiaSauVAT: number;
  thanhTienSauVAT: number;
  ghiChu?: string;
  trangThai: number;

  idDonViQuyDoi = "";
  idHangHoa = "";
  maHangHoa = "";
  tenHangHoa = "";
  giaBan = 0;

  constructor({
    id = "",
    idHoaDon = "",
    stt = 1,
    soLuong = 0,
    ptChietKhau = 0,
    tienChietKhau = 0,
    laPTChietKhau = true,
    ptThue = 0,
    tienThue = 0,
    donGiaTruocCK = 0,
    donGiaSauCK = 0,
    donGiaSauVAT = 0,
    thanhTienTruocCK = 0,
    thanhTienSauCK = 0,
    thanhTienSauVAT = 0,
    ghiChu = "",
    trangThai = InvoiceStatus.HOAN_THANH,
    idDonViQuyDoi = "",
    idHangHoa = "",
    maHangHoa = "",
    tenHangHoa = "",
    giaBan = 0,
  }) {
    this.id = id;
    this.idHoaDon = idHoaDon;
    this.stt = stt;
    this.soLuong = soLuong;
    this.ptChietKhau = ptChietKhau;
    this.tienChietKhau = tienChietKhau;
    this.laPTChietKhau = laPTChietKhau;
    this.ptThue = ptThue;
    this.tienThue = tienThue;
    this.donGiaTruocCK = donGiaTruocCK;
    this.donGiaSauCK = donGiaSauCK;
    this.donGiaSauVAT = donGiaSauVAT;
    this.thanhTienTruocCK = thanhTienTruocCK;
    this.thanhTienSauCK = thanhTienSauCK;
    this.thanhTienSauVAT = thanhTienSauVAT;
    this.ghiChu = ghiChu;
    this.trangThai = trangThai;

    this.idDonViQuyDoi = idDonViQuyDoi;
    this.idHangHoa = idHangHoa;
    this.maHangHoa = maHangHoa;
    this.tenHangHoa = tenHangHoa;
    this.giaBan = giaBan;
  }
}
