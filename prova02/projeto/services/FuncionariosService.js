import AsyncStorage from "@react-native-async-storage/async-storage";

// Alterada a chave de armazenamento para 'funcionarios'
const STORAGE_KEY = "@funcionarios";

/**
 * Lista todos os funcionários armazenados.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de objetos de funcionários.
 */
async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

/**
 * Salva um novo funcionário. Se o funcionário não tiver um ID, um novo ID será gerado.
 * @param {object} funcionario O objeto funcionário a ser salvo.
 */
async function salvar(funcionario) {
  // Gera um ID baseado no timestamp se o funcionário for novo
  if (!funcionario.id) {
    funcionario.id = new Date().getTime();
  }
  const funcionarios = await listar();
  funcionarios.push(funcionario);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
}

/**
 * Busca um funcionário pelo seu ID.
 * @param {number} id O ID do funcionário a ser buscado.
 * @returns {Promise<object|undefined>} Uma promessa que resolve para o objeto funcionário encontrado ou undefined.
 */
async function buscar(id) {
  const funcionarios = await listar();
  return funcionarios.find((funcionario) => funcionario.id === id);
}

/**
 * Remove um funcionário pelo seu ID.
 * @param {number} id O ID do funcionário a ser removido.
 */
async function remover(id) {
  const funcionarios = await listar();
  const novaLista = funcionarios.filter((funcionario) => funcionario.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

/**
 * Atualiza um funcionário existente.
 * @param {object} novoFuncionario O objeto funcionário com os dados atualizados.
 */
async function atualizar(novoFuncionario) {
  const funcionarios = await listar();
  const novaLista = funcionarios.map((funcionario) =>
    funcionario.id === novoFuncionario.id ? novoFuncionario : funcionario
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
    