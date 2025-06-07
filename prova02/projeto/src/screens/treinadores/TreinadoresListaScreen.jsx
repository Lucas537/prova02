import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import TreinadorService from "../../../services/TreinadoresService"; // Changed service import
import Toast from "react-native-toast-message";

export default function TreinadorFormScreen({ navigation, route }) {
  const treinadorAntigo = route.params || {}; // Changed variable name

  const [nome, setNome] = useState(treinadorAntigo.nome || "");
  const [especialidade, setEspecialidade] = useState(treinadorAntigo.especialidade || ""); // Changed from 'tipo' to 'especialidade'
  const [valorHora, setValorHora] = useState(treinadorAntigo.valorHora || ""); // Changed from 'preco' to 'valorHora'
  const [dataDeCadastro, setDataDeCadastro] = useState(
    treinadorAntigo.dataDeCadastro || ""
  );
  const [experiencia, setExperiencia] = useState( // Changed from 'quantidade' to 'experiencia'
    treinadorAntigo.experiencia ? String(treinadorAntigo.experiencia) : ""
  );
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({
    nome: false,
    especialidade: false, // Changed
    valorHora: false, // Changed
    dataDeCadastro: false,
    experiencia: false, // Changed
  });

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .required("Nome é obrigatório"),
    especialidade: Yup.string() // Validation for especialidade
      .min(3, "Especialidade deve ter pelo menos 3 caracteres")
      .required("Especialidade é obrigatória"),
    valorHora: Yup.string() // Validation for valorHora (currency)
      .matches(
        /^R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}$|^R\$\s?0,\d{2}$/,
        "Valor por hora inválido (Ex: R$ 0,00 ou R$ 1.234,56)"
      )
      .required("Valor por hora é obrigatório"),
    dataDeCadastro: Yup.string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/YYYY)")
      .required("Data de Cadastro é obrigatória"),
    experiencia: Yup.number() // Validation for experiencia (number)
      .min(0, "Experiência deve ser um número positivo")
      .required("Experiência é obrigatória")
      .typeError("Experiência deve ser um número"),
  });

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
        especialidade: true, // Changed
        valorHora: true, // Changed
        dataDeCadastro: true,
        experiencia: true, // Changed
      });

      await validationSchema.validate(
        { nome, especialidade, valorHora, dataDeCadastro, experiencia }, // Changed fields for validation
        { abortEarly: false }
      );
      setErrors({});

      const treinador = {
        nome,
        especialidade, // Changed
        valorHora, // Changed
        dataDeCadastro,
        experiencia: Number(experiencia), // Changed and converted to Number
      };

      if (treinadorAntigo.id) {
        treinador.id = treinadorAntigo.id;
        await TreinadorService.atualizar(treinador); // Changed service call
      } else {
        await TreinadorService.salvar(treinador); // Changed service call
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "TreinadorListaScreen" }], // Changed navigation target
      });

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Treinador salvo com sucesso!", // Changed toast message
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
        ID: {treinadorAntigo.id || "NOVO"} {/* Changed variable name */}
      </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nome do Treinador" // Changed label
        placeholder="Informe o nome do treinador" // Changed placeholder
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
        label="Especialidade" // Changed label
        placeholder="Ex: Futebol, Natação, Basquete" // Changed placeholder
        value={especialidade}
        onChangeText={setEspecialidade}
        onBlur={() => handleBlur("especialidade", especialidade)} // Changed field name
        error={!!errors.especialidade && touched.especialidade} // Changed field name
      />
      <HelperText type="error" visible={!!errors.especialidade && touched.especialidade}>
        {errors.especialidade}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Valor por Hora" // Changed label
        placeholder="R$ 0,00"
        value={valorHora}
        onChangeText={setValorHora}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$",
              suffixUnit: "",
            }}
          />
        )}
        onBlur={() => handleBlur("valorHora", valorHora)} // Changed field name
        error={!!errors.valorHora && touched.valorHora} // Changed field name
      />
      <HelperText type="error" visible={!!errors.valorHora && touched.valorHora}>
        {errors.valorHora}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Data de Cadastro"
        placeholder="DD/MM/YYYY"
        value={dataDeCadastro}
        onChangeText={setDataDeCadastro}
        keyboardType="numeric"
        render={(props) => (
          <TextInputMask
            {...props}
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
          />
        )}
        onBlur={() => handleBlur("dataDeCadastro", dataDeCadastro)}
        error={!!errors.dataDeCadastro && touched.dataDeCadastro}
      />
      <HelperText
        type="error"
        visible={!!errors.dataDeCadastro && touched.dataDeCadastro}
      >
        {errors.dataDeCadastro}
      </HelperText>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Experiência em Anos" // Changed label
        placeholder="Informe os anos de experiência" // Changed placeholder
        value={experiencia}
        onChangeText={setExperiencia}
        keyboardType="numeric"
        onBlur={() => handleBlur("experiencia", experiencia)} // Changed field name
        error={!!errors.experiencia && touched.experiencia} // Changed field name
      />
      <HelperText
        type="error"
        visible={!!errors.experiencia && touched.experiencia}
      >
        {errors.experiencia}
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