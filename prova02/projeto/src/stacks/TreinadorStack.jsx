import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

import TreinadorListaScreen from "../screens/treinadores/TreinadorListaScreen";
import TreinadorFormScreen from "../screens/treinadores/TreinadorFormScreen";

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
        name="TreinadorListaScreen"
        component={TreinadorListaScreen}
        options={({ navigation }) => ({
          title: "Lista de treinadores",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TreinadorFormScreen")}
              style={styles.headerButton}
            >
              <Ionicons name="add-circle" size={40} color="#ffc72c" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TreinadorFormScreen"
        component={TreinadorFormScreen}
        options={{
          title: "cadastro de Treinadores",
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