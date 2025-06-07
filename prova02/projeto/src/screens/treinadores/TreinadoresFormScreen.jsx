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
import TreinadorService from "../../../services/TreinadoresService"; // Changed service import
import Toast from "react-native-toast-message";

export default function TreinadorListaScreen({ navigation, route }) {
  const [treinador, setTreinador] = useState([]); // Changed state variable name
  const [modal, setModal] = useState(false);
  const [treinadorDoDelete, setTreinadorDoDelete] = useState(null); // Changed state variable name

  useEffect(() => {
    buscarTreinador(); // Changed function call
    const unsubscribe = navigation.addListener("focus", () => {
      buscarTreinador(); // Changed function call
    });
    return unsubscribe;
  }, [navigation]);

  // Removed the console.log for navigation as it's not directly related to the component's functionality
  // useEffect(() => {
  //   console.log(navigation);
  // }, [navigation]);

  async function buscarTreinador() { // Changed function name
    const listaTreinadores = await TreinadorService.listar(); // Changed service call
    setTreinador(listaTreinadores); // Changed state update
  }

  function handleDelete(item) {
    setTreinadorDoDelete(item); // Changed state update
    setModal(true);
  }

  async function confirmarDelete() {
    if (treinadorDoDelete) { // Changed state variable
      try {
        await TreinadorService.remover(treinadorDoDelete.id); // Changed service call
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: `Treinador ${treinadorDoDelete.nome} excluído`, // Changed toast message
        });
      } catch (error) {
        console.warn("Erro ao remover treinador:", error); // Changed console message
        Toast.show({
          type: "error",
          text1: "Erro ao Excluir",
          text2: "Não foi possível excluir o treinador.", // Changed toast message
        });
      } finally {
        buscarTreinador(); // Changed function call
        setModal(false);
        setTreinadorDoDelete(null); // Changed state update
      }
    }
  }

  function cancelarDelete() {
    setModal(false);
    setTreinadorDoDelete(null); // Changed state update
  }

  return (
    <ScrollView style={styles.tela}>
      <Button
        style={{ margin: 10 }}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("TreinadorFormScreen")} // Changed navigation target
      >
        Cadastrar
      </Button>

      <FlatList
        data={treinador} // Changed data source
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5, marginHorizontal: 10 }}>
            <Card.Content>
              <Text style={styles.id}>ID: {item["id"]}</Text>
              <Text>Nome: {item["nome"]}</Text>
              <Text>Especialidade: {item["especialidade"]}</Text> {/* Changed to especialidade */}
              <Text>Valor por Hora: {item["valorHora"]}</Text> {/* Changed to valorHora */}
              <Text>Data de Cadastro: {item["dataDeCadastro"]}</Text>
              <Text>Experiência: {item["experiencia"]} anos</Text> {/* Changed to experiencia */}
            </Card.Content>
            <Card.Actions>
              <Button
                icon="pencil"
                onPress={() => navigation.navigate("TreinadorFormScreen", item)} // Changed navigation target
              >
                {" "}
              </Button>
              <Button icon="delete" onPress={() => handleDelete(item)}>
                {" "}
              </Button>
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
                {treinadorDoDelete?.id} - {treinadorDoDelete?.nome} {/* Changed state variable */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    height: "100%",
    backgroundColor: "rgba(200, 162, 121, 0.5)",
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
