import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Alterado os imports para as telas de Funcionários
import FuncionarioListaScreen from "../../screens/funcionarios/FuncionariosListaScreen";
import FuncionarioFormScreen from "../../screens/funcionarios/FuncionariosFormScreen";

const Stack = createStackNavigator();

export default function FuncionarioStack() { // Nome do componente alterado
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão da stack
      }}
    >
      <Stack.Screen
        name="FuncionarioListaScreen" // Nome da tela alterado
        component={FuncionarioListaScreen}
        options={{ title: "Lista de Funcionários" }} // Título da tela alterado
      />
      <Stack.Screen
        name="FuncionarioFormScreen" // Nome da tela alterado
        component={FuncionarioFormScreen}
        options={{ title: "Formulário de Funcionários" }} // Título da tela alterado
      />
    </Stack.Navigator>
  );
}
