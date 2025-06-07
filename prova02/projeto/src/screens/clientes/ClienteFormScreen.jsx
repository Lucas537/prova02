import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import ClienteService from "../../../services/ClienteService";
import apiLocalidades from "../../../services/api/apiLocalidades";
import Toast from "react-native-toast-message";

export default function ClienteFormScreen({ navigation, route }) {
  const clienteAntigo = route.params || {};

  const [nome, setNome] = useState(clienteAntigo.nome || "");
  const [telefone, setTelefone] = useState(clienteAntigo.telefone || "");
  const [email, setEmail] = useState(clienteAntigo.email || "");
  const [cpf, setCpf] = useState(clienteAntigo.cpf || "");
  const [estado, setEstado] = useState(clienteAntigo.estado || "");
  const [estados, setEstados] = useState([]);
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({
    nome: false,
    telefone: false,
    email: false,
    cpf: false,
    estado: false,
  });

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .required("Nome é obrigatório"),
    telefone: Yup.string()
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido")
      .required("Telefone é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .required("CPF é obrigatório"),
    estado: Yup.string()
      .length(2, "Selecione um estado válido")
      .required("Estado é obrigatório"),
  });

  useEffect(() => {
    apiLocalidades
      .get("/estados?orderBy=nome")
      .then((response) => setEstados(response.data))
      .catch((error) => console.error("Erro ao carregar estados:", error));
  }, []);

  const validarCampo = async (campo, value) => {
    try {
      await validationSchema.validateAt(campo, { [campo]: value });
      setErrors((props) => ({ ...props, [campo]: "" }));
    } catch (error) {
      setErrors((props) => ({ ...props, [campo]: error.message }));
    }
  };

  const handleBlur = async (campo, value) => {
    setTouched((props) => ({ ...props, [campo]: true }));
    await validarCampo(campo, value);
  };

  async function salvar() {
    try {
      setTouched({
        nome: true,
        telefone: true,
        email: true,
        cpf: true,
        estado: true,
      });

      await validationSchema.validate(
        { nome, telefone, email, cpf, estado },
        { abortEarly: false }
      );
      setErrors({});

      const cliente = { nome, telefone, email, cpf, estado };

      if (clienteAntigo.id) {
        cliente.id = clienteAntigo.id;
        await ClienteService.atualizar(cliente);
      } else {
        await ClienteService.salvar(cliente);
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "ClienteListaScreen" }],
      });

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Cliente salvo com sucesso!",
      });
    } catch (error) {
      const newErro = {};
      error.inner.forEach((erro) => {
        newErro[erro.path] = erro.message;
      });
      setErrors(newErro);

      Toast.show({
        type: "error",
        text1: "Erro de Validação",
        text2: "Corrija os erros antes de salvar!",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 15, fontWeight: "800" }} variant="titleLarge">
        ID: {clienteAntigo.id || "NOVO"}
      </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nome"
        placeholder="Informe o nome"
        value={nome}
        onChangeText={setNome}
        onBlur={() => handleBlur("nome", nome)}
        error={!!errors.nome && touched.nome}
      />
      <HelperText type="error" visible={!!errors.nome && touched.nome}>
        {errors.nome}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Telefone"
        placeholder="Informe o Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
          />
        )}
        onBlur={() => handleBlur("telefone", telefone)}
        error={!!errors.telefone && touched.telefone}
      />
      <HelperText type="error" visible={!!errors.telefone && touched.telefone}>
        {errors.telefone}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="E-mail"
        placeholder="Informe o E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onBlur={() => handleBlur("email", email)}
        error={!!errors.email && touched.email}
      />
      <HelperText type="error" visible={!!errors.email && touched.email}>
        {errors.email}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="CPF"
        placeholder="Informe o CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"cpf"}
            value={cpf}
            onChangeText={setCpf}
          />
        )}
        onBlur={() => handleBlur("cpf", cpf)}
        error={!!errors.cpf && touched.cpf}
      />
      <HelperText type="error" visible={!!errors.cpf && touched.cpf}>
        {errors.cpf}
      </HelperText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => {
            setEstado(itemValue);
            validarCampo("estado", itemValue);
          }}
          onBlur={() => handleBlur("estado", estado)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Estado" value="" />
          {estados.map((estadoItem) => (
            <Picker.Item
              key={estadoItem.id}
              label={estadoItem.nome}
              value={estadoItem.sigla}
            />
          ))}
        </Picker>
      </View>
      <HelperText type="error" visible={!!errors.estado && touched.estado}>
        {errors.estado}
      </HelperText>
      <Button style={styles.input} mode="contained" onPress={salvar}>
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(200, 162, 121, 0.5)",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginTop: 10,
  },
  pickerContainer: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});