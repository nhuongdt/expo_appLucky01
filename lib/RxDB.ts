import {
  HoaDonChiTietDto,
  HoaDonDto,
  IHoaDonChiTietDto,
  IHoaDonDto,
} from "@/api/service/hoadon/dto";
import { InvoiceStatus } from "@/enum/InvoiceStatus";
import { createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

const invoice = {
  title: "tblHoaDon (BH_HoaDon)",
  version: 0,
  description: "describes a simple hero",
  primaryKey: "id",
  type: "object",
  required: [
    "id",
    "idLoaiChungTu",
    "idKhachHang",
    "idChiNhanh",
    "ngayLapHoaDon",
    "trangThai",
  ],
  properties: {
    isOpen: {
      type: "boolean",
    },
    id: {
      type: "string",
    },

    idLoaiChungTu: {
      type: "number",
    },
    idKhachHang: {
      type: "string",
    },
    idChiNhanh: {
      type: "string",
    },
    idNhanVien: {
      type: "string",
    },
    maHoaDon: {
      type: "string",
    },
    ngayLapHoaDon: {
      type: "string",
    },
    tongTienHangChuaChietKhau: {
      type: "number",
    },
    ptChietKhauHang: {
      type: "number",
    },
    tongChietKhauHangHoa: {
      type: "number",
    },
    tongTienHang: {
      type: "number",
    },
    ptThueHD: {
      type: "number",
    },
    tongTienThue: {
      type: "number",
    },
    tongTienHDSauVAT: {
      type: "number",
    },
    pTGiamGiaHD: {
      type: "number",
    },
    tongGiamGiaHD: {
      type: "number",
    },
    chiPhiTraHang: {
      type: "number",
    },
    tongThanhToan: {
      type: "number",
    },
    chiPhiHD: {
      type: "string",
    },
    trangThai: {
      type: "number",
    },
  },
};

const invoice_detail = {
  title: "tblHoaDon (BH_HoaDon)",
  version: 0,
  description: "describes a simple hero",
  primaryKey: "id",
  type: "object",
  required: ["id", "idDonViQuyDoi", "soLuong", "donGiaTruocCK", "trangThai"],
  properties: {
    id: {
      type: "string",
    },
    idHangHoa: {
      type: "string",
    },
    idDonViQuyDoi: {
      type: "string",
    },
    maHangHoa: {
      type: "string",
    },
    tenHangHoa: {
      type: "string",
    },
    tenNhomHang: {
      type: "string",
    },
    giaBan: {
      type: "number",
    },
    idHoaDon: {
      type: "string",
    },
    stt: {
      type: "number",
    },
    soLuong: {
      type: "number",
    },

    ptChietKhau: {
      type: "number",
    },
    tienChietKhau: {
      type: "number",
    },
    laPTChietKhau: {
      type: "boolean",
    },
    ptThue: {
      type: "number",
    },
    tienThue: {
      type: "number",
    },
    donGiaTruocCK: {
      type: "number",
    },
    donGiaSauCK: {
      type: "number",
    },
    donGiaSauVAT: {
      type: "number",
    },
    thanhTienTruocCK: {
      type: "number",
    },
    thanhTienSauCK: {
      type: "number",
    },
    thanhTienSauVAT: {
      type: "number",
    },
    ghiChu: {
      type: "string",
    },
    trangThai: {
      type: "number",
    },
  },
};

class RxDB {
  InnitDatabase = async (): Promise<RxDatabase> => {
    const db = await createRxDatabase({
      name: "RxDB_Luckybeauty", // <- name
      storage: getRxStorageDexie(), // <- RxStorage
      /* Optional parameters: */
      //   password: "myPassword", // <- password (optional)
      //   multiInstance: true, // <- multiInstance (optional, default: true)
      //   eventReduce: true, // <- eventReduce (optional, default: false)
      //   cleanupPolicy: {}, // <- custom cleanup policy (optional)
    });
    return db;
  };
  InitTable = async (db: RxDatabase) => {
    const lstTbl = await db.addCollections({
      HoaDon: {
        schema: invoice,
      },
      HoaDonChiTiet: {
        schema: invoice_detail,
      },
    });
    return lstTbl;
  };
  CheckExistsTable = (db: RxDatabase, tblName: string) => {
    const exists = db.collections[tblName] !== undefined;
    return exists;
  };
  InsertTo_HoaDon = async (db: RxDatabase, itemHD: IHoaDonDto) => {
    const tblCTHD = db.collections["HoaDon"];
    tblCTHD.insert({
      id: itemHD?.id,
      idKhachHang: itemHD?.idKhachHang,
      idChiNhanh: itemHD?.idChiNhanh,
      idNhanVien: itemHD?.idNhanVien,
      maHoaDon: itemHD?.maHoaDon,
      ngayLapHoaDon: itemHD?.ngayLapHoaDon,

      tongTienHangChuaChietKhau: itemHD?.tongTienHangChuaChietKhau,
      ptChietKhauHang: itemHD?.ptChietKhauHang ?? 0,
      tongChietKhauHangHoa: itemHD?.tongChietKhauHangHoa ?? 0,
      tongTienHang: itemHD?.tongTienHang ?? 0,
      ptThueHD: itemHD?.ptThueHD ?? 0,
      tongTienThue: itemHD?.tongTienThue ?? 0,
      tongTienHDSauVAT: itemHD?.tongTienHDSauVAT ?? 0,
      pTGiamGiaHD: itemHD?.pTGiamGiaHD ?? 0,
      tongGiamGiaHD: itemHD?.tongGiamGiaHD ?? 0,
      chiPhiTraHang: itemHD?.chiPhiTraHang ?? 0,
      tongThanhToan: itemHD?.tongThanhToan ?? 0,
      chiPhiHD: itemHD?.chiPhiHD ?? 0,
      ghiChuHD: itemHD?.ghiChuHD ?? "",
      trangThai: itemHD?.trangThai ?? InvoiceStatus.HOAN_THANH,
    });
  };
  InsertTo_HoaDonChiTiet = async (
    db: RxDatabase,
    itemCTHD: IHoaDonChiTietDto
  ) => {
    const tblCTHD = db.collections["HoaDonChiTiet"];
    tblCTHD.insert({
      id: itemCTHD?.id,
      idDonViQuyDoi: itemCTHD?.idDonViQuyDoi,
      idHoaDon: itemCTHD?.idHoaDon,
      stt: itemCTHD?.stt,
      soLuong: itemCTHD?.stt,
      donGiaTruocCK: itemCTHD?.donGiaTruocCK ?? 0,
      ptChietKhau: itemCTHD?.ptChietKhau ?? 0,
      tienChietKhau: itemCTHD?.tienChietKhau ?? 0,
      laPTChietKhau: itemCTHD?.laPTChietKhau ?? true,
      donGiaSauCK: itemCTHD?.donGiaSauCK ?? 0,
      thanhTienTruocCK: itemCTHD?.thanhTienTruocCK ?? 0,
      thanhTienSauCK: itemCTHD?.thanhTienSauCK ?? 0,
      ptThue: itemCTHD?.ptThue ?? 0,
      tienThue: itemCTHD?.tienThue ?? 0,
      donGiaSauVAT: itemCTHD?.donGiaSauVAT ?? 0,
      thanhTienSauVAT: itemCTHD?.thanhTienSauVAT ?? 0,
      ghiChu: itemCTHD?.ghiChu ?? "",
      trangThai: itemCTHD?.trangThai ?? InvoiceStatus.HOAN_THANH,
      idHangHoa: itemCTHD?.idHangHoa,
      maHangHoa: itemCTHD?.donGiaSauCK,
      tenHangHoa: itemCTHD?.maHangHoa,
      giaBan: itemCTHD?.giaBan,
      tyLeChuyenDoi: itemCTHD?.tyLeChuyenDoi,
      tenNhomHang: itemCTHD?.tenNhomHang,
    });
  };

  Update_InforHoaDon = async (db: RxDatabase, itemHD: IHoaDonDto) => {
    const tblHD = db.collections["HoaDon"];
    await tblHD.findByIds([itemHD?.id]).modify((old: IHoaDonDto) => {
      old.idKhachHang = itemHD?.idKhachHang;
      old.idChiNhanh = itemHD?.idChiNhanh;
      old.idNhanVien = itemHD?.idNhanVien;
      old.maHoaDon = itemHD?.maHoaDon;
      old.ngayLapHoaDon = itemHD?.ngayLapHoaDon;

      old.tongTienHangChuaChietKhau = itemHD?.tongTienHangChuaChietKhau;
      old.ptChietKhauHang = itemHD?.ptChietKhauHang ?? 0;
      old.tongChietKhauHangHoa = itemHD?.tongChietKhauHangHoa ?? 0;
      old.tongTienHang = itemHD?.tongTienHang ?? 0;
      old.ptThueHD = itemHD?.ptThueHD ?? 0;
      old.tongTienThue = itemHD?.tongTienThue ?? 0;
      old.tongTienHDSauVAT = itemHD?.tongTienHDSauVAT ?? 0;
      old.pTGiamGiaHD = itemHD?.pTGiamGiaHD ?? 0;
      old.tongGiamGiaHD = itemHD?.tongGiamGiaHD ?? 0;
      old.chiPhiTraHang = itemHD?.chiPhiTraHang ?? 0;
      old.tongThanhToan = itemHD?.tongThanhToan ?? 0;
      old.chiPhiHD = itemHD?.chiPhiHD ?? 0;
      old.ghiChuHD = itemHD?.ghiChuHD ?? "";
    });
  };
  Update_ChiTietHoaDon = async (db: RxDatabase, item: IHoaDonChiTietDto) => {
    const tblCTHD = db.collections["HoaDonChiTiet"];
    // fỉn cthd with idHoaDon & idQuyDoi
    await tblCTHD
      .find({
        selector: {
          idHoaDon: item?.idHoaDon,
          idDonViQuyDoi: item?.idDonViQuyDoi,
        },
      })
      .modify((old: IHoaDonChiTietDto) => {
        old.stt = item?.stt;
        old.soLuong = item?.stt;
        old.donGiaTruocCK = item?.donGiaTruocCK ?? 0;
        old.ptChietKhau = item?.ptChietKhau ?? 0;
        old.tienChietKhau = item?.tienChietKhau ?? 0;
        old.laPTChietKhau = item?.laPTChietKhau;
        old.donGiaSauCK = item?.donGiaSauCK ?? 0;
        old.thanhTienTruocCK = item?.thanhTienTruocCK ?? 0;
        old.thanhTienSauCK = item?.thanhTienSauCK ?? 0;
        old.ptThue = item?.ptThue ?? 0;
        old.tienThue = item?.tienThue ?? 0;
        old.donGiaSauVAT = item?.donGiaSauVAT ?? 0;
        old.thanhTienSauVAT = item?.thanhTienSauVAT ?? 0;
        old.ghiChu = item?.ghiChu ?? "";
      });
  };
  DeleteHoaDon = async (db: RxDatabase, idHoaDon: string) => {
    const tbl = db.collections["HoaDon"];
    await tbl.findByIds([idHoaDon]).remove();
  };
  DeleteCTHD = async (db: RxDatabase, idChiTiet: string) => {
    const tbl = db.collections["HoaDonChiTiet"];
    await tbl.findByIds([idChiTiet]).remove();
  };

  FindCTHD = async (
    db: RxDatabase,
    idHoaDon: string,
    idQuyDoi: string
  ): Promise<IHoaDonChiTietDto | null> => {
    const tbl = db.collections["HoaDonChiTiet"];
    const item = await tbl
      .findOne({
        selector: {
          idHoaDon: idHoaDon,
          idDonViQuyDoi: idQuyDoi,
        },
      })
      .exec();
    console.log("FindCTHD ", item);
    return new HoaDonChiTietDto({
      id: item?.id,
      idHoaDon: item?.idHoaDon,
      stt: item?.stt,
      soLuong: item?.soLuong,
      ptChietKhau: item?.ptChietKhau,
      tienChietKhau: item?.tienChietKhau,
      laPTChietKhau: item?.laPTChietKhau,
      ptThue: item?.ptThue,
      tienThue: item?.tienThue,
      donGiaTruocCK: item?.donGiaTruocCK,
      donGiaSauCK: item?.donGiaSauCK,
      donGiaSauVAT: item?.donGiaSauVAT,
      thanhTienTruocCK: item?.thanhTienTruocCK,
      thanhTienSauCK: item?.thanhTienSauCK,
      thanhTienSauVAT: item?.thanhTienSauVAT,
      ghiChu: item?.ghiChu,
      trangThai: item?.trangThai,

      idDonViQuyDoi: item?.idDonViQuyDoi,
      idHangHoa: item?.idHangHoa,
      maHangHoa: item?.maHangHoa,
      tenHangHoa: item?.tenHangHoa,
      giaBan: item?.giaBan,
    });
  };
}

export default new RxDB();
