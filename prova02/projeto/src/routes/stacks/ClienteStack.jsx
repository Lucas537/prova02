import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClienteListaScreen from "../../screens/clientes/ClienteListaScreen";
import ClienteFormScreen from "../../screens/clientes/ClienteFormScreen";

const Stack = createStackNavigator();

export default function ClienteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ClienteListaScreen"
        component={ClienteListaScreen}
        options={{ title: "Lista de Clientes" }}
      />
      <Stack.Screen
        name="ClienteFormScreen"
        component={ClienteFormScreen}
        options={{ title: "Formulário de Cliente" }}
      />
    </Stack.Navigator>
  );
}