import { HoaDonDto, IHoaDonDto } from "@/api/service/hoadon/dto";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Header, Icon } from "@rneui/themed";
import { Link, Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Pressable, Text, View, SafeAreaView } from "react-native";

export const HoaDonContext = createContext<{
  hoadon: IHoaDonDto;
  setHoaDon: React.Dispatch<React.SetStateAction<IHoaDonDto>>;
}>({
  hoadon: {} as IHoaDonDto,
  setHoaDon: () => console.log("44"),
});

type HeaderProps = {
  hoadon: IHoaDonDto;
  onClickBack?: () => void;
  onClickForward?: () => void;
};

export const ThuNganHeader = ({ hoadon }: HeaderProps) => {
  const router = useRouter();

  const gotoDetail = () => {
    router.push(`./temp_invoice_detail/${hoadon?.id}`);
  };

  return (
    <Header
      backgroundColor="#fff0e6"
      leftComponent={
        <Link href={"/(thu_ngan)"} asChild>
          <Pressable>
            <Icon name="arrow-back-ios" type="material" />
          </Pressable>
        </Link>
      }
      rightComponent={
        <Pressable onPress={gotoDetail}>
          <Icon name="arrow-forward-ios" type="material" />
        </Pressable>
      }
      centerComponent={
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <Text>{hoadon?.maHoaDon} </Text>
          </View>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>
            {new Intl.NumberFormat("vi-VN").format(hoadon?.tongThanhToan ?? 0)}
          </Text>
        </View>
      }
    />
  );
};

export default function TabLayout() {
  const [hoadon, setHoaDon] = useState<IHoaDonDto>({} as IHoaDonDto);

  useEffect(() => {
    // pageLoad();
  }, []);

  return (
    <HoaDonContext.Provider
      value={{
        hoadon,
        setHoaDon,
      }}
    >
      <StatusBar
        barStyle="dark-content" // Kiểu chữ cho thanh trạng thái
        backgroundColor="#f8f8f8" // Màu nền của thanh trạng thái
        translucent={false} // Đặt là true nếu muốn nền trong suốt
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerStyle: {
            backgroundColor: "yellow",
          },
          headerTitleStyle: {
            color: "red",
            fontWeight: 400,
            fontSize: 16,
            textAlign: "center",
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: "#ebebe0",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Hóa đơn",
            title: "Hóa đơn tạm",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="san_pham"
          options={{
            tabBarLabel: "Sản phẩm",
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons
                name={focused ? "event-note" : "note"}
                color={color}
                size={24}
              />
            ),
            header: () => {
              return <ThuNganHeader hoadon={hoadon} />;
            },
          }}
        />
      </Tabs>
    </HoaDonContext.Provider>
  );
}
