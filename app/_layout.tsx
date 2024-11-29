import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import SQLite from "@/lib/SQLite";
import LoginService from "@/api/service/login/LoginService";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import LoginScreen from "./login";
import NotFoundScreen from "./+not-found";
import SaleLayout from "./navigation/sale_layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  useEffect(() => {
    CheckUser_HasLogin();
  }, []);

  const CheckUser_HasLogin = async () => {
    try {
      // await SecureStore.deleteItemAsync("user");
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
    setIsLoadingForm(false);
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
      if (currentDbVersion === 0) {
        await SQLite.CreateTable_HoaDon(db);
        await SQLite.CreateTable_HoaDonChiTiet(db);

        currentDbVersion = 1;
      }
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  }

  if (!isLogin) return <LoginScreen onLoginOK={() => setIsLogin(true)} />;
  const Stack = createNativeStackNavigator();
  return (
    <SQLiteProvider databaseName="luckybeauty.db" onInit={migrateDbIfNeeded}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content" // Kiểu chữ cho thanh trạng thái
          backgroundColor="#f8f8f8" // Màu nền của thanh trạng thái
          translucent={false} // Đặt là true nếu muốn nền trong suốt
        />
        <Stack.Navigator>
          <Stack.Screen
            name="navigation/sale_layout"
            component={SaleLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="+not-found"
            component={NotFoundScreen}
            options={{ title: "Page not found" }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SQLiteProvider>
  );
}
