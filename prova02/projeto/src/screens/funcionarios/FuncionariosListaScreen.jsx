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
import FuncionarioService from "../../../services/FuncionariosService"; // Changed service import
import Toast from "react-native-toast-message";

export default function FuncionarioListaScreen({ navigation, route }) {
  const [funcionario, setFuncionario] = useState([]); // Changed state variable
  const [modal, setModal] = useState(false);
  const [funcionarioDoDelete, setFuncionarioDoDelete] = useState(null); // Changed state variable

  useEffect(() => {
    buscarFuncionario(); // Changed function call
    const unsubscribe = navigation.addListener("focus", () => {
      buscarFuncionario(); // Changed function call
    });
    return unsubscribe;
  }, [navigation]);

  async function buscarFuncionario() { // Changed function name
    const listaFuncionarios = await FuncionarioService.listar(); // Changed service call
    setFuncionario(listaFuncionarios); // Changed state update
  }

  function handleDelete(item) {
    setFuncionarioDoDelete(item); // Changed state update
    setModal(true);
  }

  async function confirmarDelete() {
    if (funcionarioDoDelete) { // Changed state variable
      try {
        await FuncionarioService.remover(funcionarioDoDelete.id); // Changed service call
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: `Funcionário ${funcionarioDoDelete.nome} excluído`, // Changed toast message
        });
      } catch (error) {
        console.warn("Erro ao remover funcionário:", error); // Changed console message
        Toast.show({
          type: "error",
          text1: "Erro ao Excluir",
          text2: "Não foi possível excluir o funcionário.", // Changed toast message
        });
      } finally {
        buscarFuncionario(); // Changed function call
        setModal(false);
        setFuncionarioDoDelete(null); // Changed state update
      }
    }
  }

  function cancelarDelete() {
    setModal(false);
    setFuncionarioDoDelete(null); // Changed state update
  }

  return (
    <ScrollView style={styles.tela}>
      <Button
        style={{ margin: 10 }}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("FuncionarioFormScreen")} // Changed navigation target
      >
        Cadastrar
      </Button>

      <FlatList
        data={funcionario} // Changed data source
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5, marginHorizontal: 10 }}>
            <Card.Content>
              <Text style={styles.id}>ID: {item["id"]}</Text>
              <Text>Nome: {item["nome"]}</Text>
              <Text>Telefone: {item["telefone"]}</Text>
              <Text>CPF: {item["cpf"]}</Text> {/* Changed CNPJ to CPF */}
              <Text>Email: {item["email"]}</Text>
              <Text>Estado: {item["estado"]}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="pencil"
                onPress={() =>
                  navigation.navigate("FuncionarioFormScreen", item) // Changed navigation target
                }
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
                {funcionarioDoDelete?.id} - {funcionarioDoDelete?.nome} {/* Changed state variable */}
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