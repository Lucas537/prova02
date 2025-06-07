import { Image, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClienteStack from "./stacks/ClienteStack";
import FuncionarioStack from "./stacks/FuncionarioStack";
import TreinadorStack from "./stacks/TreinadorStack";


const Tab = createBottomTabNavigator();

const renderHeaderLeft = (navigation) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    style={styles.icon}
  >
    <Image style={{ height: 30, width: 20, marginLeft: 15 }} source={menu} />
  </TouchableOpacity>
);

export default function TabRoutes() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0e0b30" />
      <Tab.Navigator>
        <Tab.Screen
          name="ClienteStack"
          component={ClienteStack}
          options={({ navigation }) => ({
            swipeEnabled: true,
            title: "Clientes",
            headerTitleStyle: { color: "#fff", fontWeight: "800" },
            headerStyle: { backgroundColor: "#0e0b30" },
            headerLeft: () => renderHeaderLeft(navigation),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#0e0b30",
            drawerLabel: "Clientes",
          })}
        />
        <Tab.Screen
          name="FuncionarioStack"
          component={FuncionarioStack}
          options={({ navigation }) => ({
            swipeEnabled: true,
            title: "Funcionarios",
            headerTitleStyle: { color: "#fff", fontWeight: "800" },
            headerStyle: { backgroundColor: "#0e0b30" },
            headerLeft: () => renderHeaderLeft(navigation),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="airplane" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#0e0b30",
            drawerLabel: "Funcionarios",
          })}
        />
        <Tab.Screen
          name="TreinadorStack"
          component={TreinadorStack}
          options={({ navigation }) => ({
            swipeEnabled: true,
            title: "Treinadores",
            headerTitleStyle: { color: "#fff", fontWeight: "800" },
            headerStyle: { backgroundColor: "#0e0b30" },
            headerLeft: () => renderHeaderLeft(navigation),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="build" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#0e0b30",
            drawerLabel: "YTreinadores",
          })}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    padding: 7,
  },
});