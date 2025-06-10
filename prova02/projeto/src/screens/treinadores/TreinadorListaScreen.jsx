import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import TreinadorService from "../../../services/TreinadorService";
import Toast from "react-native-toast-message";

export default function TreinadorListaScreen({ navigation, route }) {
  const [treinador, setTreinador] = useState([]);
  const [modal, setModal] = useState(false);
  const [treinadorDoDelete, setTreinadorDoDelete] = useState(null);

  useEffect(() => {
    buscarTreinador();
    const unsubscribe = navigation.addListener("focus", () => {
      buscarTreinador();
    });
    return unsubscribe;
  }, [navigation]);

  async function buscarTreinador() {
    const listaTreinadores = await TreinadorService.listar();
    setTreinador(listaTreinadores);
  }

  function handleDelete(item) {
    setTreinadorDoDelete(item);
    setModal(true);
  }

  async function confirmarDelete() {
    if (treinadorDoDelete) {
      try {
        await TreinadorService.remover(treinadorDoDelete.id);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: `Treinador ${treinadorDoDelete.nome} excluído`,
        });
      } catch (error) {
        console.warn("Erro ao remover treinador:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao Excluir",
          text2: "Não foi possível excluir o treinador.",
        });
      } finally {
        buscarTreinador();
        setModal(false);
        setTreinadorDoDelete(null);
      }
    }
  }

  function cancelarDelete() {
    setModal(false);
    setTreinadorDoDelete(null);
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={treinador}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5, marginHorizontal: 10 }}>
            <Card.Content>
              <Text style={styles.id}>ID: {item["id"]}</Text>
              <Text>Nome: {item["nome"]}</Text>
              <Text>CPF: {item["cpf"]}</Text>
              <Text>Data Nasc.: {item["dataDeNascimento"]}</Text>
              <Text>Estado Civil: {item["estadoCivil"]}</Text>
              <Text>Estado Nasc.: {item["estadoDeNascimento"]}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="pencil"
                onPress={() => navigation.navigate("TreinadorFormScreen", item)}
              >
                {" "}
              </Button>
              <Button
                style={{ backgroundColor: "red" }}
                icon="delete"
                onPress={() => handleDelete(item)}
              />
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={cancelarDelete}
      >
        <View style={styles.centralizar}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={cancelarDelete}
              style={styles.botaoFechar}
            >
              <Ionicons name="close-circle" size={24} color="gray" />
            </TouchableOpacity>

            <Text style={styles.perguntaModal}>
              Quer apagar o {"\n"}
              <Text>
                {treinadorDoDelete?.id} - {treinadorDoDelete?.nome}
              </Text>
              ?
            </Text>

            <View style={styles.containerBotoesModal}>
              <Button
                mode="contained"
                onPress={confirmarDelete}
                buttonColor="red"
                style={styles.botaoModal}
              >
                Sim
              </Button>
              <Button
                mode="outlined"
                onPress={cancelarDelete}
                textColor="blue"
                style={styles.botaoModal}
              >
                Não
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    height: "100%",
    backgroundColor: "#222222",
  },
  id: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 16,
  },
  centralizar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.6,
    width: "80%",
    position: "relative",
  },
  containerBotoesModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
  },
  botaoModal: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 6,
    paddingVertical: 4,
  },
  perguntaModal: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 25,
    color: "#333",
  },
  botaoFechar: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});