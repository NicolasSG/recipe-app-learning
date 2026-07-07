// =============================================
// ELEMENTOS DO DOM
// Coloque aqui os elementos que for utilizar do DOM
// =============================================



// =============================================
// CONFIGURAÇÃO DA API
// =============================================

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// =============================================
// FUNÇÕES DE ESTADO (UI)
// Controlam o que aparece na tela: loading, erro, vazio, resultados
// =============================================

function showLoading() {
  // TODO
}

function hideLoading() {
  // TODO
}

function showError(message) {
  // TODO
}

function hideError() {
  // TODO
}

function showEmpty() {
  // TODO
}

function hideEmpty() {
  // TODO
}

// =============================================
// FUNÇÕES DE REQUISIÇÃO (API)
// Fazem chamadas à TheMealDB com async/await
// =============================================

async function fetchRecipesByName(name) {
  // Endpoint: /search.php?s={name}
  // Retorna: lista de receitas (ou null se não encontrar)
  // TODO
}

async function fetchCategories() {
  // Endpoint: /categories.php
  // Retorna: lista de categorias
  // TODO
}

async function fetchRecipesByCategory(category) {
  // Endpoint: /filter.php?c={category}
  // Retorna: lista de receitas da categoria (sem detalhes completos)
  // TODO
}

// =============================================
// FUNÇÕES DE RENDERIZAÇÃO (DOM)
// Recebem dados e criam os elementos HTML na página
// =============================================

function renderRecipes(meals) {
  // Limpa o grid e renderiza um card para cada receita
  // Estrutura esperada de cada card: veja o README e o styles.css
  // TODO
}

function renderCategories(categories) {
  // Limpa a área de categorias e renderiza um botão para cada uma
  // Cada botão deve chamar handleCategoryClick ao ser clicado
  // A classe do botão é: 'category-btn'
  // TODO
}

// =============================================
// HANDLERS DE EVENTO
// Reagem às ações do usuário
// =============================================

function handleSearch() {
  // Lê o valor do input, valida, chama fetchRecipesByName
  // Gerencia os estados de loading, erro e vazio
  // TODO
}

function handleCategoryClick(categoryName, clickedButton) {
  // Remove a classe 'category-btn--active' de todos os botões
  // Adiciona 'category-btn--active' no botão clicado
  // Chama fetchRecipesByCategory e renderiza os resultados
  // TODO
}

// =============================================
// INICIALIZAÇÃO
// Ponto de entrada da aplicação
// =============================================

async function init() {
  // 1. Busca e renderiza as categorias
  // 2. Registra os event listeners (busca por clique e por Enter)
  // TODO
}

init();
