import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ClienteListaScreen from "../screens/clientes/ClienteListaScreen";
import ClienteFormScreen from "../screens/clientes/ClienteFormScreen";

const Stack = createStackNavigator();

export default function ClienteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
          borderBottomColor: "white",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          item: "center",
          color: "#ffc72c",
          fontWeight: 700,
          textTransform: "capitalize",
        },
      }}
    >
      <Stack.Screen
        name="ClienteListaScreen"
        component={ClienteListaScreen}
        options={({ navigation }) => ({
          title: "Lista de Clientes",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ClienteFormScreen")}
              style={styles.headerButton}
            >
              <Ionicons name="add-circle" size={40} color="#ffc72c" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ClienteFormScreen"
        component={ClienteFormScreen}
        options={{
          title: "cadastro de clientes",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    right: 10,
    padding: 5,
  },
});