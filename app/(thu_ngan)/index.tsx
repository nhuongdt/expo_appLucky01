import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";
import { Icon, Button, ListItem } from "@rneui/themed";
import { useEffect, useRef, useContext, useState, FC } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Href, useNavigation, useRouter } from "expo-router";
import { HoaDonContext } from "./_layout";
import uuid from "react-native-uuid";
import { HoaDonDto, IHoaDonDto } from "@/api/service/hoadon/dto";
import SQLite from "@/lib/SQLite";

const stylesInvoiceItem = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,.03)",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderRadius: 8,
    shadowColor: "red",
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  boxCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 5,
  },
});

const HoaDonTam = () => {
  const firstLoad = useRef(true);
  const router = useRouter();
  const db = useSQLiteContext();
  const { setHoaDon } = useContext(HoaDonContext);

  const [lstHoaDon, setLstHoaDon] = useState<IHoaDonDto[]>([]);

  const getHoaDonFromCache = async () => {
    const data = await db.getAllAsync<IHoaDonDto>("select * from tblHoaDon");
    // await SQLite.ClearAllData(db);
    setLstHoaDon(data);
  };

  useEffect(() => {
    getHoaDonFromCache();
  }, []);

  const createNewInvoice = async () => {
    await SQLite.CreateTable_HoaDon(db);
    const newId = uuid.v4().toString();
    setHoaDon(
      new HoaDonDto({ id: newId, maHoaDon: `Hóa đơn ${lstHoaDon?.length + 1}` })
    );
    router.push("/san_pham");
  };

  const removeInvoice = async (id: string) => {
    await SQLite.RemoveHoaDon_byId(db, id);
  };

  const goDetail = (id: string) => {
    const url = `/thu_ngan/temp_invoice_detail/${id}`;
    // console.log("url", url);
    // router.push(url as never as Href);
    router.push(("/thu_ngan/temp_invoice_detail/" + id) as never as Href);
  };

  return (
    <View style={styles.container}>
      <Button onPress={createNewInvoice}>
        <Icon name="add" color="white" />
        Tạo hóa đơn
      </Button>
      {lstHoaDon?.length > 0 && (
        <ScrollView>
          {lstHoaDon?.map((item) => (
            <Pressable
              style={stylesInvoiceItem.container}
              key={item?.id}
              onPress={() => goDetail(item?.id)}
            >
              <View
                style={{
                  flex: 1,
                  gap: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBlockColor: "#ccc",
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
                    <Text style={{ fontWeight: 500 }}>{item?.maHoaDon}</Text>
                    <Text>12:01</Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Text style={{ fontWeight: 500, textAlign: "right" }}>
                      {new Intl.NumberFormat("vi-VN").format(
                        item?.tongThanhToan ?? 0
                      )}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ textAlign: "right" }}
                    >
                      {item?.tenKhachHang}
                    </Text>
                  </View>
                </View>

                <Icon
                  type="material-community"
                  name="pencil-circle-outline"
                  size={24}
                  style={{ flex: 1 }}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default HoaDonTam;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
