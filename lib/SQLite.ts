import {
  HoaDonChiTietDto,
  HoaDonDto,
  IHoaDonChiTietDto,
  IHoaDonDto,
} from "@/api/service/hoadon/dto";
import { InvoiceStatus } from "@/enum/InvoiceStatus";
import * as sqlite from "expo-sqlite";

class SQLite {
  OpenDatabase = async (): Promise<sqlite.SQLiteDatabase> => {
    const db = await sqlite.openDatabaseAsync("Luckybeauty_Sqllite");
    return db;
  };
  InitDatabase = async (): Promise<sqlite.SQLiteDatabase> => {
    const db = await sqlite.openDatabaseAsync("Luckybeauty_Sqllite");
    await db.execAsync(`PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS tblHoaDon (Id text PRIMARY KEY, MaHoaDon text, NgayLapHoaDon text, IdChiNhanh text, IdKhachHang text, IdNhanVien text,
        TongTienHangChuaChietKhau real,  PTChietKhauHang real default 0, TongChietKhauHangHoa real, TongTienHang real, PTThueHD real default 0, TongTienThue real default 0,
        TongTienHDSauVAT real, PTGiamGiaHD real, TongGiamGiaHD real, ChiPhiTraHang real default 0, TongThanhToan real, ChiPhiHD real default 0, GhiChuHD text, TrangThai integer default 3);

       CREATE TABLE IF NOT EXISTS tblHoaDonChiTiet (Id text PRIMARY KEY, IdHoaDon text, STT integer, IdDonViQuyDoi text, IdHangHoa text, IdChiTietHoaDon text,
        MaHangHoa text, TenHangHoa text,
        SoLuong real,  DonGiaTruocCK real, ThanhTienTruocCK real, laPTChietKhau integer default 1, PTChietKhau real default 0, TienChietKhau real, DonGiaSauCK real, ThanhTienSauCK real,
        PTThue real default 0, TienThue real default 0, DonGiaSauVAT real, ThanhTienSauVAT real, GhiChu text, TrangThai integer default 1);
        
        `);
    return db;
  };
  ClearAllData = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync("DELETE FROM tblHoaDonChiTiet; DELETE FROM tblHoaDon; ");
  };
  CreateTable_KhachHang = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS tblKhachHang (Id text PRIMARY KEY, MaKhachHang text, TenKhachHang text, SoDienThoai text, DiaChi text, GioiTinhNam integer,
        Avatar real,  TongTichDiem real)`);
  };
  CreateTable_KhachHangCheckIn = async (db: sqlite.SQLiteDatabase) => {
    await db.runAsync(`CREATE TABLE IF NOT EXISTS tblKhachHangCheckIn (Id text PRIMARY KEY, IdKhachHang text, IdChiNhanh text, DatetimeCheckIn text, TrangThai integer,
        FOREIGN KEY (IdKhachHang)
        REFERENCES tblKhachHang (Id)
           ON DELETE CASCADE
           ON UPDATE NO ACTION))`);
  };
  CreateTable_CheckInHoaDon = async (db: sqlite.SQLiteDatabase) => {
    db.runAsync(`CREATE TABLE IF NOT EXISTS tblCheckInHoaDon (Id text PRIMARY KEY, IdCheckIn text, IdBooking text, IdHoaDon text, TrangThai integer,
        FOREIGN KEY (IdCheckIn)
        REFERENCES tblKhachHangCheckIn (Id),
        FOREIGN KEY (IdHoaDon)
        REFERENCES tblHoaDon (Id))`);
  };
  CreateTable_HoaDon = async (db: sqlite.SQLiteDatabase) => {
    try {
      //drop table if exists tblHoaDon;
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tblHoaDon (id text PRIMARY KEY, idLoaiChungTu integer default 1, maHoaDon text, ngayLapHoaDon text, idChiNhanh text, idKhachHang text, idNhanVien text,
        tongTienHangChuaChietKhau real,  ptChietKhauHang real default 0, tongChietKhauHangHoa real, tongTienHang real, ptThueHD real default 0, tongTienThue real default 0,
        tongTienHDSauVAT real, ptGiamGiaHD real, tongGiamGiaHD real, chiPhiTraHang real default 0, tongThanhToan real, chiPhiHD real default 0, ghiChuHD text, trangThai integer default 3,
        maKhachHang text, tenKhachHang text, soDienThoai text);`);
    } catch (error) {
      console.log("CreateTable_HoaDon ", error);
    }
  };
  CreateTable_HoaDonChiTiet = async (db: sqlite.SQLiteDatabase) => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tblHoaDonChiTiet (id text PRIMARY KEY, idHoaDon text, stt integer, idDonViQuyDoi text, idHangHoa text, idChiTietHoaDon text,
        maHangHoa text, tenHangHoa text,
        soLuong real,  donGiaTruocCK real, thanhTienTruocCK real, laPTChietKhau integer default 1, ptChietKhau real default 0, tienChietKhau real, donGiaSauCK real, thanhTienSauCK real,
        ptThue real default 0, tienThue real default 0, donGiaSauVAT real, thanhTienSauVAT real, ghiChu text, trangThai integer default 1);`);
    } catch (error) {
      console.log("CreateTable_HoaDonChiTiet ", error);
    }
  };
  DeleteHoaDonChiTiet_byIdQuyDoi = async (
    db: sqlite.SQLiteDatabase,
    idHoaDon: string,
    idDonViQuyDoi: string
  ) => {
    try {
      await db.runAsync(
        `DELETE from tblHoaDonChiTiet where idDonViQuyDoi= $idDonViQuyDoi and idHoaDon = $idHoaDon`,
        { $idDonViQuyDoi: idDonViQuyDoi, $idHoaDon: idHoaDon }
      );
    } catch (error) {
      console.log("DeleteHoaDonChiTiet_byIdQuyDoi ", error);
    }
  };
  InsertTo_HoaDon = async (db: sqlite.SQLiteDatabase, itemNew: HoaDonDto) => {
    try {
      await db.runAsync(
        `INSERT INTO tblHoaDon (id, idLoaiChungTu, idChiNhanh, idKhachHang, idNhanVien,
        maHoaDon, ngayLapHoaDon,
        tongTienHangChuaChietKhau, ptChietKhauHang, tongChietKhauHangHoa, tongTienHang,
        ptThueHD, tongTienThue, tongTienHDSauVAT, 
        pTGiamGiaHD, tongGiamGiaHD, chiPhiTraHang, tongThanhToan,chiPhiHD,
        ghiChuHD, trangThai,
        maKhachHang, tenKhachHang, soDienThoai)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        itemNew.id,
        itemNew?.idLoaiChungTu,
        itemNew?.idChiNhanh,
        itemNew?.idKhachHang,
        itemNew?.idNhanVien,
        itemNew?.maHoaDon,
        itemNew?.ngayLapHoaDon,
        itemNew?.tongTienHangChuaChietKhau,
        itemNew?.ptChietKhauHang,
        itemNew?.tongChietKhauHangHoa,
        itemNew?.tongTienHang ?? 0,
        itemNew?.ptThueHD ?? 0,
        itemNew?.tongTienThue ?? 0,
        itemNew?.tongTienHDSauVAT ?? 0,
        itemNew?.pTGiamGiaHD ?? 0,
        itemNew?.tongGiamGiaHD ?? 0,
        itemNew?.chiPhiTraHang ?? 0,
        itemNew?.tongThanhToan ?? 0,
        itemNew?.chiPhiHD ?? 0,
        itemNew?.ghiChuHD ?? 0,
        itemNew?.trangThai ?? InvoiceStatus.HOAN_THANH,
        itemNew?.maKhachHang,
        itemNew?.tenKhachHang,
        itemNew?.soDienThoai
      );
    } catch (error) {
      console.log("InsertTo_HoaDon ", error);
    }
  };
  UpdateHoaDon = async (db: sqlite.SQLiteDatabase, itemNew: IHoaDonDto) => {
    try {
      await db.runAsync(
        `UPDATE tblHoaDon 
        SET idLoaiChungTu = $idLoaiChungTu, 
          idKhachHang = $idKhachHang,  
          maHoaDon = $maHoaDon, 
          ngayLapHoaDon = $ngayLapHoaDon,
          tongTienHangChuaChietKhau = $tongTienHangChuaChietKhau, 
          ptChietKhauHang = $ptChietKhauHang, 
          tongChietKhauHangHoa = $tongChietKhauHangHoa, 
          tongTienHang = $tongTienHang, 
          ptThueHD = $ptThueHD, 
          tongTienThue = $tongTienThue, 
          tongTienHDSauVAT = $tongTienHDSauVAT, 
          pTGiamGiaHD = $pTGiamGiaHD, 
          tongGiamGiaHD = $tongGiamGiaHD, 
          chiPhiTraHang = $chiPhiTraHang, 
          tongThanhToan = $tongThanhToan, 
          chiPhiHD = $chiPhiHD, 
          ghiChuHD = $ghiChuHD, 
          trangThai = $trangThai
      WHERE id = '${itemNew.id}'`,
        {
          $idLoaiChungTu: itemNew?.idLoaiChungTu,
          $idKhachHang: itemNew?.idKhachHang,
          $maHoaDon: itemNew?.maHoaDon,
          $ngayLapHoaDon: itemNew?.ngayLapHoaDon,
          $tongTienHangChuaChietKhau: itemNew?.tongTienHangChuaChietKhau,
          $ptChietKhauHang: itemNew?.ptChietKhauHang,
          $tongChietKhauHangHoa: itemNew?.tongChietKhauHangHoa,
          $tongTienHang: itemNew?.tongTienHang,
          $ptThueHD: itemNew?.ptThueHD,
          $tongTienThue: itemNew?.tongTienThue,
          $tongTienHDSauVAT: itemNew?.tongTienHDSauVAT,
          $pTGiamGiaHD: itemNew?.pTGiamGiaHD,
          $tongGiamGiaHD: itemNew?.tongGiamGiaHD,
          $chiPhiTraHang: itemNew?.chiPhiTraHang,
          $tongThanhToan: itemNew?.tongThanhToan,
          $chiPhiHD: itemNew?.chiPhiHD,
          $ghiChuHD: itemNew?.ghiChuHD,
          $trangThai: itemNew?.trangThai,
        }
      );
    } catch (error) {
      console.log("UpdateTo_HoaDonChiTiet ", error);
    }
  };
  InsertTo_HoaDonChiTiet = async (
    db: sqlite.SQLiteDatabase,
    itemNew: IHoaDonChiTietDto
  ) => {
    try {
      await db.runAsync(
        `INSERT INTO tblHoaDonChiTiet (id, idHoaDon, idDonViQuyDoi, idHangHoa,
        maHangHoa, tenHangHoa,
        stt, soLuong, donGiaTruocCK, thanhTienTruocCK,
        donGiaSauCK, thanhTienSauCK ,
        donGiaSauVAT, thanhTienSauVAT)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        itemNew.id,
        itemNew?.idHoaDon,
        itemNew?.idDonViQuyDoi,
        itemNew?.idDonViQuyDoi,
        itemNew?.maHangHoa,
        itemNew?.tenHangHoa,
        itemNew?.stt,
        itemNew?.soLuong,
        itemNew?.donGiaTruocCK,
        itemNew?.thanhTienTruocCK,
        itemNew?.donGiaSauCK ?? 0,
        itemNew?.thanhTienSauCK ?? 0,
        itemNew?.donGiaSauVAT ?? 0,
        itemNew?.thanhTienSauVAT ?? 0
      );
    } catch (error) {
      console.log("InsertTo_HoaDonChiTiet ", error);
    }
  };
  UpdateTo_HoaDonChiTiet = async (
    db: sqlite.SQLiteDatabase,
    itemNew: IHoaDonChiTietDto
  ) => {
    try {
      const thanhtien = (itemNew?.donGiaTruocCK ?? 0) * (itemNew?.soLuong ?? 0);
      await db.runAsync(
        `UPDATE tblHoaDonChiTiet SET soLuong = ?, thanhTienTruocCK = ?,  thanhTienSauCK = ?, thanhTienSauVAT = ?
      WHERE idDonViQuyDoi = ?`,
        itemNew?.soLuong,
        thanhtien,
        thanhtien,
        thanhtien,
        itemNew?.idDonViQuyDoi
      );
    } catch (error) {
      console.log("UpdateTo_HoaDonChiTiet ", error);
    }
  };
  GetHoaDon_byId = async (db: sqlite.SQLiteDatabase, idHoaDon: string) => {
    try {
      const data = await db.getFirstAsync<IHoaDonDto>(
        `SELECT * FROM tblHoaDon where Id = '${idHoaDon}'`
      );
      return data;
    } catch (error) {
      console.log("GetHoaDon_byId ", error);
    }
    return null;
  };
  GetChiTietHoaDon_byIdHoaDon = async (
    db: sqlite.SQLiteDatabase,
    idHoaDon: string
  ): Promise<IHoaDonChiTietDto[]> => {
    try {
      const lst = await db.getAllAsync<IHoaDonChiTietDto>(
        `SELECT * FROM tblHoaDonChiTiet where IdHoaDon = '${idHoaDon}'`
      );
      return lst;
    } catch (error) {
      console.log("GetChiTietHoaDon_byIdHoaDon ", error);
    }
    return [];
  };
  GetFirstRow_HoaDonChiTiet = async (
    db: sqlite.SQLiteDatabase,
    idHoaDon: string,
    idDonViQuyDoi: string
  ): Promise<IHoaDonChiTietDto | null> => {
    try {
      const data = await db.getFirstAsync<IHoaDonChiTietDto>(
        `SELECT * FROM tblHoaDonChiTiet where IdHoaDon = '${idHoaDon}' and IdDonViQuyDoi= '${idDonViQuyDoi}'`
      );
      return data;
    } catch (error) {
      console.log("GetFirstRow_HoaDonChiTiet ", error);
    }
    return null;
  };
  UpdateHD_fromCTHD = async (
    db: sqlite.SQLiteDatabase,
    idHoaDon: string
  ): Promise<IHoaDonDto | null> => {
    try {
      const lst = await this.GetChiTietHoaDon_byIdHoaDon(db, idHoaDon);
      let tongTienHangChuaChietKhau = 0,
        tongChietKhauHang = 0,
        tongTienThue = 0;
      for (let index = 0; index < lst.length; index++) {
        const element = lst[index];
        tongTienHangChuaChietKhau += element.thanhTienTruocCK;
        tongChietKhauHang += element.soLuong * (element?.tienChietKhau ?? 0);
        tongTienThue += element.soLuong * (element?.tienThue ?? 0);
      }

      const hd = await this.GetHoaDon_byId(db, idHoaDon);
      if (hd != null) {
        const sumThanhTienSauCK = tongTienHangChuaChietKhau - tongChietKhauHang;
        hd.tongTienHangChuaChietKhau = tongTienHangChuaChietKhau;
        hd.tongChietKhauHangHoa = tongChietKhauHang;
        hd.tongTienHang = sumThanhTienSauCK;
        hd.tongTienThue = tongTienThue;
        hd.tongTienHDSauVAT = sumThanhTienSauCK - tongTienThue;

        const ptGiamGiaHD = sumThanhTienSauCK > 0 ? hd?.pTGiamGiaHD ?? 0 : 0;
        let tongGiamHD = sumThanhTienSauCK > 0 ? hd?.tongGiamGiaHD ?? 0 : 0;
        if (hd?.pTGiamGiaHD > 0) {
          tongGiamHD = (ptGiamGiaHD * hd.tongTienHDSauVAT) / 100;
        }
        hd.tongThanhToan = hd.tongTienHDSauVAT - tongGiamHD;

        await this.UpdateHoaDon(db, hd);
        return hd;
      }
    } catch (error) {
      console.log("UpdateHD_fromCTHD ", error);
    }
    return null;
  };
  RemoveHoaDon_byId = async (db: sqlite.SQLiteDatabase, id: string) => {
    await db.execAsync(`DELETE from tblHoaDon where Id='${id}';
      DELETE from tblHoaDonChiTiet where IdHoaDon='${id}'`);
  };
}

export default new SQLite();
