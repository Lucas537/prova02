import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

import FuncionarioListaScreen from "../screens/funcionarios/FuncionarioListaScreen";
import FuncionarioFormScreen from "../screens/funcionarios/FuncionarioFormScreen";

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
        name="FuncionarioListaScreen"
        component={FuncionarioListaScreen}
        options={({ navigation }) => ({
          title: "Lista de funcionários",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("FuncionarioFormScreen")}
              style={styles.headerButton}
            >
              <Ionicons name="add-circle" size={40} color="#ffc72c" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FuncionarioFormScreen"
        component={FuncionarioFormScreen}
        options={{
          title: "cadastro de funcionários",
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