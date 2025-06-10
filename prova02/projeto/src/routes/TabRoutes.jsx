import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";

import ClienteStack from "../stacks/ClienteStack";
import FuncionarioStack from "../stacks/FuncionarioStack";
import TreinadorStack from "../stacks/TreinadorStack";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#222222",
          },
          tabBarInactiveBackgroundColor: "#000",
          tabBarActiveTintColor: "#ffc72c",
          tabBarInactiveTintColor: "#ffffff",
        }}
      >
        <Tab.Screen
          name="ClienteStack"
          component={ClienteStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            title: "Clientes",
          }}
        />
        <Tab.Screen
          name="FuncionarioStack"
          component={FuncionarioStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="briefcase" color={color} size={size} />
            ),
            title: "Funcionários",
          }}
        />
        <Tab.Screen
          name="TreinadorStack"
          component={TreinadorStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell" color={color} size={size} />
            ),
            title: "Treinadores",
          }}
        />
      </Tab.Navigator>
    </>
  );
}