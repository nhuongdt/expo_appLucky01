import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export const TempInvoiceDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
};
