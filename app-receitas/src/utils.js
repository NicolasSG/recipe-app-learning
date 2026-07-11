const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipesByName(name) {
  return fetch(`${BASE_URL}/search.php?s=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => data.meals)
    .catch((err) => {
      console.log(err);
    });

  // Endpoint: /search.php?s={name}
  // Retorna: lista de receitas (ou null se não encontrar)
  // TODO
}

export async function fetchCategories() {
  return fetch(`${BASE_URL}/categories.php`)
    .then((res) => {
      return res.json();
    })
    .then((data) => data.categories)
    .catch((err) => {
      console.log(err);
    });
  // Endpoint: /categories.php
  // Retorna: lista de categorias
  // TODO
}

export async function fetchRecipesByCategory(category) {
  return fetch(`${BASE_URL}/filter.php?c=${category}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => data.meals)
    .catch((err) => {
      console.log(err);
    });
  // Endpoint: /filter.php?c={category}
  // Retorna: lista de receitas da categoria (sem detalhes completos)
  // TODO
}
