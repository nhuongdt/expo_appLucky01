import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import LoginScreen from "./login";
import LoginService from "@/api/service/login/LoginService";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import SQLite from "@/lib/SQLite";

export default function RootLayout() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("light");
    }, 0);
    CheckUser_HasLogin();
  }, []);

  const CheckUser_HasLogin = async () => {
    try {
      const dataUser = await LoginService.checkUser_fromCache();
      if (dataUser != null) {
        const token = await LoginService.checkUserLogin(
          dataUser,
          dataUser.tenantId ?? 0
        );
        if (token != null) {
          setIsLogin(true);
          // setUserLogin({
          //   ...userLogin,
          //   userNameOrEmailAddress: dataUser.userNameOrEmailAddress,
          // });

          SecureStore.setItem("accessToken", token.accessToken);
        } else {
          setIsLogin(false);
        }
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      setIsLogin(false);
    }
    //setIsLoadingForm(false);
  };

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let dataVersion = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");

    if (dataVersion) {
      let currentDbVersion = dataVersion.user_version;
      if (currentDbVersion >= DATABASE_VERSION) {
        return;
      }
      console.log("curr", currentDbVersion);
      if (currentDbVersion === 0) {
        await SQLite.CreateTable_HoaDon(db);
        await SQLite.CreateTable_HoaDonChiTiet(db);

        // await db.execAsync(`
        //   PRAGMA journal_mode = 'wal';

        //  CREATE TABLE IF NOT EXISTS tblHoaDon (Id text PRIMARY KEY NOT NULL, MaHoaDon text, NgayLapHoaDon text, IdChiNhanh text, IdKhachHang text, IdNhanVien text,
        //     TongTienHangChuaChietKhau real,  PTChietKhauHang real default 0, TongChietKhauHangHoa real, TongTienHang real, PTThueHD real default 0, TongTienThue real default 0,
        //     TongTienHDSauVAT real, PTGiamGiaHD real, TongGiamGiaHD real, ChiPhiTraHang real default 0, TongThanhToan real, ChiPhiHD real default 0, GhiChuHD text, TrangThai integer default 3);

        //    CREATE TABLE IF NOT EXISTS tblHoaDonChiTiet (Id text PRIMARY KEY NOT NULL, IdHoaDon text, STT integer, IdDonViQuyDoi text, IdHangHoa text, IdChiTietHoaDon text,
        //     MaHangHoa text, TenHangHoa text,
        //     SoLuong real,  DonGiaTruocCK real, ThanhTienTruocCK real, laPTChietKhau integer default 1, PTChietKhau real default 0, TienChietKhau real, DonGiaSauCK real, ThanhTienSauCK real,
        //     PTThue real default 0, TienThue real default 0, DonGiaSauVAT real, ThanhTienSauVAT real, GhiChu text, TrangThai integer default 1);
        // `);

        currentDbVersion = 1;
      }
      // if (currentDbVersion === 1) {
      //   Add more migrations
      // }
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  }

  if (!isLogin) return <LoginScreen onLoginOK={() => setIsLogin(true)} />;

  return (
    <SQLiteProvider databaseName="luckybeauty.db" onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen name="(thu_ngan)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SQLiteProvider>
  );
}
