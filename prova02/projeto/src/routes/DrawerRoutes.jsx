import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import InicioScreen from "../screens/InicioScreen";
import TabRoutes from "./TabRoutes";

import menu from "../../assets/menu-branco.png";


import imagemPecas from "../../assets/imagemPecas.png";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0e0b30" />
      <Drawer.Navigator>
        <Drawer.Screen
          name="Inicio"
          component={InicioScreen}
          options={({ navigation }) => ({
            swipeEnabled: true,
            title: "Amis",
            drawerLabel: "Início",
            headerTitleStyle: {
              color: "#fff",
              fontWeight: "900",
              left: 130,
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: "#0e0b30",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.icon}
              >
                <Image style={{ height: 30, width: 20 }} source={menu} />
                {/* Exemplo usando a imagemPecas se quiser */}
                {/* <Image style={{ height: 30, width: 30 }} source={imagemPecas} /> */}
              </TouchableOpacity>
            ),
            drawerActiveTintColor: "#fff",
            drawerActiveBackgroundColor: "#0e0b30",
            drawerInactiveTintColor: "#000",
          })}
        />
        <Drawer.Screen
          name="Cadastros"
          component={TabRoutes}
          options={{
            swipeEnabled: true,
            headerShown: false,
            drawerActiveTintColor: "#fff",
            drawerActiveBackgroundColor: "#0e0b30",
            drawerInactiveTintColor: "#000",
            overlayColor: "#000",
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    padding: 7,
  },
});
