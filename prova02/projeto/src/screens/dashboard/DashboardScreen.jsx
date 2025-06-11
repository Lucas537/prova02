import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import ClienteService from "../../../services/ClienteService";
import { useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen() {
  const [clientesPorEstado, setClientesPorEstado] = useState({});
  const [totalClientes, setTotalClientes] = useState(0);

  useFocusEffect(() => {
    buscarDadosDoDashboard();
  });

  async function buscarDadosDoDashboard() {
    const listaClientes = await ClienteService.listar();
    setTotalClientes(listaClientes.length);

    const contagemPorEstado = listaClientes.reduce((acc, cliente) => {
      const estado = cliente.estado || "Não Informado";
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    const sortedClientesPorEstado = Object.entries(contagemPorEstado)
      .sort(([, countA], [, countB]) => countB - countA)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    setClientesPorEstado(sortedClientesPorEstado);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Dashboard de Clientes</Title>
      </View>

      <Card style={styles.cardTotal}>
        <Card.Content>
          <Paragraph style={styles.cardTotalText}>Total de Clientes:</Paragraph>
          <Title style={styles.cardTotalNumber}>{totalClientes}</Title>
        </Card.Content>
      </Card>

      <Title style={styles.subtitle}>Clientes por Estado</Title>
      {Object.keys(clientesPorEstado).length > 0 ? (
        Object.entries(clientesPorEstado).map(([estado, count]) => (
          <Card key={estado} style={styles.cardEstado}>
            <Card.Content style={styles.cardEstadoContent}>
              <Text style={styles.estadoNome}>{estado}:</Text>
              <Text style={styles.estadoCount}>{count} clientes</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Card style={styles.cardEstado}>
          <Card.Content>
            <Text style={styles.noDataText}>Nenhum cliente cadastrado.</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    padding: 15,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  cardTotal: {
    backgroundColor: "#42A5F5",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  cardTotalText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardTotalNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
  },
  cardEstado: {
    backgroundColor: "#313131",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  cardEstadoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  estadoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E0E0E0",
  },
  estadoCount: {
    fontSize: 18,
    color: "#BBBBBB",
  },
  noDataText: {
    fontSize: 16,
    color: "#BBBBBB",
    textAlign: "center",
  },
});