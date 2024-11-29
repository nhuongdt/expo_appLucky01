import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { useEffect, useRef, useContext, useState, FC } from "react";
import { useSQLiteContext } from "expo-sqlite";
import uuid from "react-native-uuid";
import { HoaDonDto, IHoaDonDto } from "@/api/service/hoadon/dto";
import SQLite from "@/lib/SQLite";
import { format } from "date-fns";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  BottomTabParamList,
  ListBottomTab,
} from "@/app/navigation/BottomTabParamList";
import { ThemedText } from "@/components/ThemedText";

type TempInvoiceProps = NativeStackNavigationProp<
  BottomTabParamList,
  ListBottomTab.TEMP_INVOICE
>;

type TempInvoiceRouteProp = RouteProp<
  { params: { idHoaDon: string; tongThanhToan: number } },
  "params"
>;

const TempInvoice = () => {
  const firstLoad = useRef(true);
  const db = useSQLiteContext();
  const navigation = useNavigation<TempInvoiceProps>();
  const route = useRoute<TempInvoiceRouteProp>();

  const { idHoaDon = "", tongThanhToan = 0 } = route.params || {};
  const [idHoaDonChosing, setIdHoaDonChosing] = useState("");
  const [lstHoaDon, setLstHoaDon] = useState<IHoaDonDto[]>([]);

  const getHoaDonFromCache = async () => {
    const data = await db.getAllAsync<IHoaDonDto>("select * from tblHoaDon");
    // await SQLite.ClearAllData(db);
    setLstHoaDon([...data]);
  };

  useEffect(() => {
    getHoaDonFromCache();
  }, []);

  useEffect(() => {
    getInforHoadon_byId();
  }, [tongThanhToan]);

  const createNewInvoice = async () => {
    await SQLite.CreateTable_HoaDon(db);
    const newId = uuid.v4().toString();
    setIdHoaDonChosing(newId);
    const newHD = new HoaDonDto({
      id: newId,
      maHoaDon: `Hóa đơn ${lstHoaDon?.length + 1}`,
    });
    await SQLite.InsertTo_HoaDon(db, newHD);

    navigation.navigate(ListBottomTab.PRODUCT, {
      idHoaDon: newId,
      maHoaDon: newHD.maHoaDon,
      tongThanhToan: 0,
    });

    setLstHoaDon([newHD, ...lstHoaDon]);
  };

  const removeInvoice = async (id: string) => {
    await SQLite.RemoveHoaDon_byId(db, id);
    setLstHoaDon(lstHoaDon?.filter((x) => x.id !== id));
  };

  const goInvoiceDetail = (item: IHoaDonDto) => {
    navigation.navigate(ListBottomTab.TEMP_INVOICE_DETAIL, {
      idHoaDon: item?.id,
      maHoaDon: item?.maHoaDon,
      tongThanhToan: item?.tongThanhToan,
    });
    setIdHoaDonChosing(item?.id);
  };

  const getInforHoadon_byId = async () => {
    const data = await SQLite.GetHoaDon_byId(db, idHoaDonChosing);
    if (data) {
      setLstHoaDon(
        lstHoaDon?.map((x) => {
          if (x.id == idHoaDonChosing) {
            return { ...x, tongThanhToan: data?.tongThanhToan };
          } else {
            return x;
          }
        })
      );
    }
  };

  const gotoEdit = (item: IHoaDonDto) => {
    setIdHoaDonChosing(item?.id);
    navigation.navigate(ListBottomTab.PRODUCT, {
      idHoaDon: item.id,
      maHoaDon: item.maHoaDon,
      tongThanhToan: item.tongThanhToan,
    });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={createNewInvoice}
        titleStyle={{ fontSize: 18, color: "white" }}
        buttonStyle={{ backgroundColor: "#EA9B66" }}
      >
        <Icon name="add" color="white" />
        Tạo hóa đơn
      </Button>
      {lstHoaDon?.length > 0 && (
        <ScrollView>
          {lstHoaDon?.map((item) => (
            <Pressable
              style={stylesInvoiceItem.container}
              key={item?.id}
              onPress={() => goInvoiceDetail(item)}
            >
              <View
                style={{
                  flex: 1,
                  gap: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  type="materialicon"
                  name="delete-outline"
                  size={24}
                  color={"#ff944d"}
                  style={{ flex: 1 }}
                  onPress={() => removeInvoice(item?.id)}
                />
                <View style={stylesInvoiceItem.boxCenter}>
                  <View style={{ flex: 2 }}>
                    <ThemedText style={{ fontWeight: 500 }}>
                      {item?.maHoaDon}
                    </ThemedText>
                    <ThemedText
                      style={{ color: "rgb(178, 183, 187)", fontSize: 14 }}
                    >
                      {format(new Date(item.ngayLapHoaDon), "HH:mm")}
                    </ThemedText>
                  </View>
                  <View style={{ flex: 3 }}>
                    <ThemedText style={{ fontWeight: 500, textAlign: "right" }}>
                      {new Intl.NumberFormat("vi-VN").format(
                        item?.tongThanhToan ?? 0
                      )}
                    </ThemedText>
                    <ThemedText
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        textAlign: "right",
                        color: "rgb(178, 183, 187)",
                      }}
                    >
                      {item?.tenKhachHang}
                    </ThemedText>
                  </View>
                </View>

                <Icon
                  type="antdesign"
                  name="edit"
                  size={24}
                  style={{ flex: 1 }}
                  onPress={() => gotoEdit(item)}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default TempInvoice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(245, 247, 244)",
  },
});
const stylesInvoiceItem = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  boxCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 5,
  },
});
