import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./src/routes/DrawerRoutes"; // Este arquivo é o que define as rotas com os novos nomes
import TabRoutes from "./src/routes/TabRoutes"; // Se estiver usando abas, também precisará ser atualizado
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* As rotas de navegação dentro de DrawerRoutes (e TabRoutes, se usado)
            são onde as alterações de "fornecedores" para "funcionarios" e
            "produtos" para "treinadores" realmente se manifestam. */}
        <DrawerRoutes />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
