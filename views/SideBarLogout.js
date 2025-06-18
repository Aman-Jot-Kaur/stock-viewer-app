import { View, Alert } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
const SideBarLogout = () => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    const handleLogout = async () => {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
          //   onPress: () => navigation.goBack(),
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userIdSA");
              await AsyncStorage.removeItem("userEmailSA");

              Toast.show({
                type: "success",
                text1: "Logged out successfully",
              });
              // Navigate to Login screen
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error) {
              console.error("Error during logout:", error);
              Toast.show({
                type: "error",
                text1: "Error logging out",
                text2: error.message,
              });
            }
          },
        },
      ]);
    };
    handleLogout();
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    ></View>
  );
};

export default SideBarLogout;