import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./src/routes/TabRoutes";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});