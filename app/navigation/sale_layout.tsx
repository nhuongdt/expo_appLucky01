import { IHoaDonDto } from "@/api/service/hoadon/dto";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Header, Icon } from "@rneui/themed";
import { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TempInvoice from "../screens/sale/temp_invoice";
import { TempInvoiceDetails } from "../screens/sale/temp_invoice_detail";
import ProductSale from "../screens/sale/product_sale";
import { SaleInvoiceContext } from "../contexts/SaleInvoiceContext";
import { BottomTabParamList, ListBottomTab } from "./BottomTabParamList";

export default function SaleLayout() {
  useEffect(() => {
    // pageLoad();
  }, []);

  const Tabs = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tabs.Navigator
      initialRouteName="TempInvoice"
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "yellow",
        },
        headerTitleAlign: "center",
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
        name="TempInvoice"
        component={TempInvoice}
        options={{
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
        name="Product"
        component={ProductSale}
        options={({ navigation, route }: any) => ({
          title: `${route.params?.maHoaDon} _ ${new Intl.NumberFormat(
            "vi-VN"
          ).format(route.params?.tongThanhToan)}`,
          tabBarLabel: "Sản phẩm",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={focused ? "event-note" : "note"}
              color={color}
              size={24}
            />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate(ListBottomTab.TEMP_INVOICE, {
                  tongThanhToan: route.params?.tongThanhToan,
                });
              }}
            >
              <Icon name="arrow-back-ios" type="material" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Icon name="arrow-forward-ios" type="material" />
            </Pressable>
          ),
        })}
      />
      <Tabs.Screen
        name="TempInvoiceDetails"
        component={TempInvoiceDetails}
        options={({ route }: any) => ({
          title: `${route.params?.maHoaDon}`,
          tabBarButton: () => null,
        })}
      />
    </Tabs.Navigator>
  );
}
