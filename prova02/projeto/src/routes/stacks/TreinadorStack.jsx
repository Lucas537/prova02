import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Alterado os imports para as telas de Treinadores
import TreinadoresListaScreen from "../../screens/treinadores/TreinadoresListaScreen"; 
import TreinadoresFormScreen from "../../screens/treinadores/TreinadoresFormScreen"; 

const Stack = createStackNavigator();

export default function TreinadoresStack() { 
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="TreinadoresListaScreen" 
        component={TreinadoresListaScreen}
        options={{ title: "Lista de Treinadores" }} 
      />
      <Stack.Screen
        name="TreinadoresFormScreen" // 
        component={TreinadoresFormScreen}
        options={{ title: "Formulário de Treinador" }} 
      />
    </Stack.Navigator>
  );
}
