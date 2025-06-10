import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@treinadores";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(treinador) {
  treinador.id = new Date().getTime();
  const treinadores = await listar();
  treinadores.push(treinador);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(treinadores));
}

async function buscar(id) {
  const treinadores = await listar();
  return treinadores.find((treinador) => treinador.id === id);
}

async function remover(id) {
  const treinadores = await listar();
  const novaLista = treinadores.filter((treinador) => treinador.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novotreinadore) {
  const treinadores = await listar();
  const novaLista = treinadores.map((treinador) =>
    treinador.id === novotreinadore.id ? novotreinadore : treinador
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