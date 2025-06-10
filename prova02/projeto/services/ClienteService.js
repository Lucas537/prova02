import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@clientes";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(cliente) {
  cliente.id = new Date().getTime();
  const clientes = await listar();
  clientes.push(cliente);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}

async function buscar(id) {
  const clientes = await listar();
  return clientes.find((cliente) => cliente.id === id);
}

async function remover(id) {
  const clientes = await listar();
  const novaLista = clientes.filter((cliente) => cliente.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novoCliente) {
  const clientes = await listar();
  const novaLista = clientes.map((cliente) =>
    cliente.id === novoCliente.id ? novoCliente : cliente
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