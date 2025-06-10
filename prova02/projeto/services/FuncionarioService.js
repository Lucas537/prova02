import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@funcionarios";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(funcionario) {
  funcionario.id = new Date().getTime();
  const funcionarios = await listar();
  funcionarios.push(funcionario);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
}

async function buscar(id) {
  const funcionarios = await listar();
  return funcionarios.find((funcionario) => funcionario.id === id);
}

async function remover(id) {
  const funcionarios = await listar();
  const novaLista = funcionarios.filter((funcionario) => funcionario.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novofuncionario) {
  const funcionarios = await listar();
  const novaLista = funcionarios.map((funcionario) =>
    funcionario.id === novofuncionario.id ? novofuncionario : funcionario
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover,
};