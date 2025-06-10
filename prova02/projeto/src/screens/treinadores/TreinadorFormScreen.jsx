import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import TreinadorService from "../../../services/TreinadorService";
import apiLocalidades from "../../../services/api/apiLocalidades";
import Toast from "react-native-toast-message";

export default function TreinadorFormScreen({ navigation, route }) {
  const treinadorAntigo = route.params || {};

  const [nome, setNome] = useState(treinadorAntigo.nome || "");
  const [cpf, setCpf] = useState(treinadorAntigo.cpf || "");
  const [dataDeNascimento, setDataDeNascimento] = useState(
    treinadorAntigo.dataDeNascimento || ""
  );
  const [estadoCivil, setEstadoCivil] = useState(
    treinadorAntigo.estadoCivil || ""
  );

  const [estadoDeNascimento, setEstadoDeNascimento] = useState(
    treinadorAntigo.estadoDeNascimento || ""
  );
  const [estados, setEstados] = useState([]);
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({
    nome: false,
    cpf: false,
    dataDeNascimento: false,
    estadoCivil: false,
    estadoDeNascimento: false,
  });

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .required("Nome é obrigatório"),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .required("CPF é obrigatório"),
    dataDeNascimento: Yup.string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/YYYY)")
      .required("Data de Nascimento é obrigatória"),
    estadoCivil: Yup.string()
      .oneOf(
        ["solteiro", "casado", "viuvo", "divorciado"],
        "Selecione um estado civil válido"
      )
      .required("Estado Civil é obrigatório"),
    estadoDeNascimento: Yup.string()
      .length(2, "Selecione um estado válido")
      .required("Estado de Nascimento é obrigatório"),
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
        cpf: true,
        dataDeNascimento: true,
        estadoCivil: true,
        estadoDeNascimento: true,
      });

      await validationSchema.validate(
        { nome, cpf, dataDeNascimento, estadoCivil, estadoDeNascimento },
        { abortEarly: false }
      );
      setErrors({});

      const treinador = {
        nome,
        cpf,
        dataDeNascimento,
        estadoCivil,
        estadoDeNascimento,
      };

      if (treinadorAntigo.id) {
        treinador.id = treinadorAntigo.id;
        await TreinadorService.atualizar(treinador);
      } else {
        await TreinadorService.salvar(treinador);
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "TreinadorListaScreen" }],
      });

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Treinador salvo com sucesso!",
      });
    } catch (error) {
      const newErro = {};
      error.inner?.forEach((erro) => {
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
      <Text
        style={{ marginTop: 15, fontWeight: "800", color: "white" }}
        variant="titleLarge"
      >
        ID: {treinadorAntigo.id || "NOVO"}
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
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Data de Nascimento"
        placeholder="DD/MM/YYYY"
        value={dataDeNascimento}
        onChangeText={setDataDeNascimento}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={dataDeNascimento}
            onChangeText={setDataDeNascimento}
          />
        )}
        onBlur={() => handleBlur("dataDeNascimento", dataDeNascimento)}
        error={!!errors.dataDeNascimento && touched.dataDeNascimento}
      />
      <HelperText
        type="error"
        visible={!!errors.dataDeNascimento && touched.dataDeNascimento}
      >
        {errors.dataDeNascimento}
      </HelperText>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estadoCivil}
          onValueChange={(itemValue) => {
            setEstadoCivil(itemValue);
            validarCampo("estadoCivil", itemValue);
          }}
          onBlur={() => handleBlur("estadoCivil", estadoCivil)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Estado Civil" value="" />
          <Picker.Item label="Solteiro" value="solteiro" />
          <Picker.Item label="Casado" value="casado" />
          <Picker.Item label="Viúvo" value="viuvo" />
          <Picker.Item label="Divorciado" value="divorciado" />
        </Picker>
      </View>
      <HelperText
        type="error"
        visible={!!errors.estadoCivil && touched.estadoCivil}
      >
        {errors.estadoCivil}
      </HelperText>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estadoDeNascimento}
          onValueChange={(itemValue) => {
            setEstadoDeNascimento(itemValue);
            validarCampo("estadoDeNascimento", itemValue);
          }}
          onBlur={() => handleBlur("estadoDeNascimento", estadoDeNascimento)}
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
      <HelperText
        type="error"
        visible={!!errors.estadoDeNascimento && touched.estadoDeNascimento}
      >
        {errors.estadoDeNascimento}
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
    backgroundColor: "#222222",
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