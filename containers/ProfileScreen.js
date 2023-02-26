import { useRoute } from "@react-navigation/core";
import { Text, View, Platform } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  return <View>{/* <Text>user id : {params.userId}</Text> */}</View>;
}
