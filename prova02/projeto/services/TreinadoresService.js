import AsyncStorage from "@react-native-async-storage/async-storage";

// Alterada a chave de armazenamento para 'treinadores'
const STORAGE_KEY = "@treinadores";

/**
 * Lista todos os treinadores armazenados.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de objetos de treinadores.
 */
async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

/**
 * Salva um novo treinador. Se o treinador não tiver um ID, um novo ID será gerado.
 * @param {object} treinador O objeto treinador a ser salvo.
 */
async function salvar(treinador) {
  // Gera um ID baseado no timestamp se o treinador for novo
  if (!treinador.id) {
    treinador.id = new Date().getTime();
  }
  const treinadores = await listar();
  treinadores.push(treinador);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(treinadores));
}

/**
 * Busca um treinador pelo seu ID.
 * @param {number} id O ID do treinador a ser buscado.
 * @returns {Promise<object|undefined>} Uma promessa que resolve para o objeto treinador encontrado ou undefined.
 */
async function buscar(id) {
  const treinadores = await listar();
  return treinadores.find((treinador) => treinador.id === id);
}

/**
 * Remove um treinador pelo seu ID.
 * @param {number} id O ID do treinador a ser removido.
 */
async function remover(id) {
  const treinadores = await listar();
  const novaLista = treinadores.filter((treinador) => treinador.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

/**
 * Atualiza um treinador existente.
 * @param {object} novoTreinador O objeto treinador com os dados atualizados.
 */
async function atualizar(novoTreinador) {
  const treinadores = await listar();
  const novaLista = treinadores.map((treinador) =>
    treinador.id === novoTreinador.id ? novoTreinador : treinador
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

// Exporta as funções para serem usadas em outros módulos
export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover,
};
