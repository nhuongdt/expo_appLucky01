import { IHoaDonChiTietDto, IHoaDonDto } from "@/api/service/hoadon/dto";
import SQLite from "@/lib/SQLite";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
type InvoiceDetailRouteProp = RouteProp<
  { params: { idHoaDon: string } },
  "params"
>;

export const TempInvoiceDetails = () => {
  const route = useRoute<InvoiceDetailRouteProp>();
  const { idHoaDon } = route.params;
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
  }, [idHoaDon]);

  return (
    <View style={styles.container}>
      <View style={styles.boxInvoice}>
        <View style={{ flexDirection: "row" }}>
          <Text>Tổng thanh toán</Text>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            {hoadonOpen?.tongThanhToan}
          </Text>
        </View>
      </View>
      <View style={styles.containerDetail}>
        {lstCTHD?.map((item) => (
          <View
            key={item?.id}
            style={{ borderBottomWidth: 1, borderBlockColor: "#ccc" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {item?.tenHangHoa}
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text>{item?.soLuong}</Text>
              <Text>{item?.donGiaSauCK}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "white",
    flex: 1,
  },
  boxInvoice: {
    gap: 10,
  },
  containerDetail: {
    gap: 8,
  },
});
