import SQLite from "@/lib/SQLite";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IHoaDonChiTietDto, IHoaDonDto } from "@/api/service/hoadon/dto";
import {
  BottomTabParamList,
  ListBottomTab,
} from "@/app/navigation/BottomTabParamList";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Button, Icon } from "@rneui/themed";

type TempInvoiceDetailsProps = NativeStackNavigationProp<
  BottomTabParamList,
  ListBottomTab.TEMP_INVOICE_DETAIL
>;

type InvoiceDetailRouteProp = RouteProp<
  { params: { idHoaDon: string; tongThanhToan: number } },
  "params"
>;

export const TempInvoiceDetails = () => {
  const route = useRoute<InvoiceDetailRouteProp>();
  const navigation = useNavigation<TempInvoiceDetailsProps>();
  const { idHoaDon, tongThanhToan } = route.params;
  const db = useSQLiteContext();
  const [lstCTHD, setLstCTHD] = useState<IHoaDonChiTietDto[]>([]);
  const [hoadonOpen, setHoaDonOpen] = useState<IHoaDonDto>({
    id: idHoaDon,
  } as IHoaDonDto);

  const GetDatHoaDon_fromCache = async () => {
    const hd = await SQLite.GetHoaDon_byId(db, idHoaDon);
    const lst = await SQLite.GetChiTietHoaDon_byIdHoaDon(db, idHoaDon);
    if (hd != null) {
      setHoaDonOpen({ ...hd });
      setLstCTHD([...lst]);
    }
  };

  useEffect(() => {
    GetDatHoaDon_fromCache();
  }, [idHoaDon, tongThanhToan]);

  const CaculatorHD_byTongTienHang = async (tongTienHang: number) => {
    let ptGiamGiaHD = hoadonOpen.ptGiamGiaHD;
    let giamgiaHD = hoadonOpen.tongGiamGiaHD;
    let tongThue = hoadonOpen.tongTienThue;
    if (tongTienHang > 0) {
      if (ptGiamGiaHD > 0) {
        giamgiaHD = ((tongTienHang + tongThue) * ptGiamGiaHD) / 100;
      } else {
        if (giamgiaHD > tongTienHang) {
          giamgiaHD = 0;
        }
      }
    } else {
      giamgiaHD = 0;
      tongThue = 0;
    }
    let tongThanhToan = tongTienHang + tongThue - giamgiaHD;

    setHoaDonOpen({
      ...hoadonOpen,
      tongGiamGiaHD: giamgiaHD,
      tongTienThue: tongThue,
      tongTienHangChuaChietKhau: tongTienHang, // todo
      tongTienHang: tongTienHang,
      tongTienHDSauVAT: tongTienHang + tongThue,
      tongThanhToan: tongThanhToan,
    });
    await SQLite.UpdateHD_fromCTHD(db, idHoaDon);
    navigation.setParams({
      tongThanhToan: tongThanhToan,
    });
  };

  const tangSoLuong = async (item: IHoaDonChiTietDto) => {
    const slNew = item.soLuong + 1;
    setLstCTHD(
      lstCTHD?.map((x) => {
        if (x.id === item.id) {
          return {
            ...x,
            soLuong: slNew,
            thanhTienTruocCK: slNew * item?.donGiaTruocCK,
            thanhTienSauCK: slNew * item?.donGiaSauCK,
            thanhTienSauVAT: slNew * item?.donGiaSauVAT,
          };
        } else {
          return x;
        }
      })
    );
    item.soLuong = slNew;
    await SQLite.UpdateTo_HoaDonChiTiet(db, item);

    let tongtien = hoadonOpen.tongTienHang + item.donGiaSauCK;
    await CaculatorHD_byTongTienHang(tongtien);
  };

  const giamSoLuong = async (item: IHoaDonChiTietDto) => {
    let slNew = item.soLuong;
    if (slNew > 1) {
      slNew = slNew - 1;
      setLstCTHD(
        lstCTHD?.map((x) => {
          if (x.id === item.id) {
            return {
              ...x,
              soLuong: slNew,
              thanhTienTruocCK: slNew * item?.donGiaTruocCK,
              thanhTienSauCK: slNew * item?.donGiaSauCK,
              thanhTienSauVAT: slNew * item?.donGiaSauVAT,
            };
          } else {
            return x;
          }
        })
      );
      item.soLuong = slNew;
      await SQLite.UpdateTo_HoaDonChiTiet(db, item);
    } else {
      // remove from list
      setLstCTHD(lstCTHD?.filter((x) => x.id !== item.id));
      await SQLite.DeleteHoaDonChiTiet_byId(db, item.id);
    }
    let tongtien = hoadonOpen.tongTienHang - item.donGiaSauCK;
    await CaculatorHD_byTongTienHang(tongtien);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDetail}>
        <View style={{ gap: 8 }}>
          {lstCTHD?.map((item, index) => (
            <View
              key={item?.id}
              style={{
                borderBottomWidth: index < lstCTHD?.length - 1 ? 1 : 0,
                borderBlockColor: "#ccc",
                padding: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ gap: 8 }}>
                  <ThemedText style={{ fontWeight: 500 }}>
                    {item?.tenHangHoa}
                  </ThemedText>
                  <ThemedText
                    style={{ fontSize: 18, color: "rgb(178, 183, 187)" }}
                  >
                    {new Intl.NumberFormat("vi-VN").format(item?.donGiaSauCK)}
                  </ThemedText>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={30}
                    color={"#ccc"}
                    onPress={() => giamSoLuong(item)}
                  />
                  <ThemedText style={{ fontSize: 18 }}>
                    {item?.soLuong}
                  </ThemedText>
                  <Ionicons
                    name="add-circle-outline"
                    size={30}
                    color={"#ccc"}
                    onPress={() => tangSoLuong(item)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.boxInvoice}>
        <View style={{ gap: 12 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText>Tổng tiền hàng</ThemedText>
            <ThemedText style={{ fontSize: 18 }}>
              {new Intl.NumberFormat("vi-VN").format(hoadonOpen?.tongTienHang)}
            </ThemedText>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText>Giảm giá</ThemedText>
            <ThemedText style={{ fontSize: 18 }}>
              {new Intl.NumberFormat("vi-VN").format(hoadonOpen?.tongGiamGiaHD)}
            </ThemedText>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText>Tổng cộng</ThemedText>
            <ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
              {new Intl.NumberFormat("vi-VN").format(hoadonOpen?.tongThanhToan)}
            </ThemedText>
          </View>
        </View>
      </View>
      <Button
        titleStyle={{ fontSize: 18, color: "white" }}
        size="lg"
        containerStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 8,
        }}
        buttonStyle={{
          backgroundColor: "#D7681D",
          borderRadius: 4,
        }}
      >
        <Icon name="check" color="white" containerStyle={{ marginRight: 10 }} />
        Thanh toán
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(245, 247, 244)",
    flex: 1,
    position: "relative",
  },
  boxInvoice: {
    bottom: 75,
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    padding: 16,
  },
  containerDetail: {
    padding: 16,
    backgroundColor: "white",
  },
});
