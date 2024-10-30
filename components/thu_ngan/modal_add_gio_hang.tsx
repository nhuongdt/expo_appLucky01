import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IPropModal } from "@/api/commonProp/IPropModal";
import { IHoaDonChiTietDto } from "@/api/service/hoadon/dto";

export default function ModalAddGioHang({
  isShow,
  objUpdate,
  onClose,
  onSave,
}: IPropModal<IHoaDonChiTietDto>) {
  const [ctDoing, setCTDoing] = useState<IHoaDonChiTietDto>(
    {} as IHoaDonChiTietDto
  );

  useEffect(() => {
    if (isShow) {
      setCTDoing({
        ...ctDoing,
        id: objUpdate?.id ?? "",
        maHangHoa: objUpdate?.maHangHoa ?? "",
        tenHangHoa: objUpdate?.tenHangHoa ?? "",
        idDonViQuyDoi: objUpdate?.idDonViQuyDoi ?? "",
        idHangHoa: objUpdate?.idHangHoa ?? "",
        idHoaDon: objUpdate?.idHoaDon ?? "",
        soLuong: objUpdate?.soLuong ?? 0,
        donGiaTruocCK: objUpdate?.donGiaTruocCK ?? 0,
        donGiaSauCK: objUpdate?.donGiaSauCK ?? 0,
        donGiaSauVAT: objUpdate?.donGiaSauVAT ?? 0,
        thanhTienTruocCK: objUpdate?.thanhTienTruocCK ?? 0,
        thanhTienSauCK: objUpdate?.thanhTienSauCK ?? 0,
        thanhTienSauVAT: objUpdate?.thanhTienSauVAT ?? 0,
      });
    }
  }, [isShow]);

  const PageLoad = async () => {};

  const tangSoLuong = () => {
    const slNew = ctDoing.soLuong + 1;
    setCTDoing({
      ...ctDoing,
      soLuong: slNew,
      thanhTienTruocCK: slNew * (ctDoing?.donGiaTruocCK ?? 0),
      thanhTienSauCK: slNew * (ctDoing?.donGiaSauCK ?? 0),
      thanhTienSauVAT: slNew * (ctDoing?.donGiaSauVAT ?? 0),
    });
  };

  const giamSoLuong = () => {
    let slNew = ctDoing.soLuong;
    if (slNew > 0) {
      slNew = slNew - 1;
    }
    const thanhtien = slNew * (ctDoing?.donGiaTruocCK ?? 0);
    setCTDoing({
      ...ctDoing,
      soLuong: slNew,
      thanhTienTruocCK: thanhtien,
      thanhTienSauCK: thanhtien,
      thanhTienSauVAT: thanhtien,
    });
  };

  const agreeGioHang = async () => {
    onSave(ctDoing);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isShow}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalView}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={"#c0c0c0"} />
          </Pressable>
          <View style={{ gap: 16, alignItems: "center" }}>
            <Text style={styles.productName}>{ctDoing?.tenHangHoa}</Text>
            <Text style={styles.productPrice}>
              {new Intl.NumberFormat("vi-VN").format(
                ctDoing?.donGiaTruocCK ?? 0
              )}
            </Text>

            <View
              style={{
                gap: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "left" }}>Số lượng</Text>
              <Ionicons
                name="remove-circle-outline"
                size={30}
                color={"#ccc"}
                onPress={giamSoLuong}
              />
              <Text style={[styles.productPrice, { textAlign: "center" }]}>
                {ctDoing.soLuong}
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={"#ccc"}
                onPress={tangSoLuong}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              borderTopColor: "#cccc",
              borderTopWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text style={[styles.productPrice]}>Thành tiền</Text>
              <Text style={[styles.productName]}>
                {new Intl.NumberFormat("vi-VN").format(
                  ctDoing?.thanhTienSauCK ?? 0
                )}
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={agreeGioHang}
            >
              <Text>Thêm vào giỏ hàng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productName: { fontSize: 16, fontWeight: "600" },
  productPrice: { fontSize: 14, fontWeight: "500" },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#ffe4c4",
    marginTop: 16,
  },
});
