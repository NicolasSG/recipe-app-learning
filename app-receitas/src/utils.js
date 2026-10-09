const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipesByName(name) {
  return fetch(`${BASE_URL}/search.php?s=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => data.meals)
    .catch((err) => {
      throw err;
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
      throw err;
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
      throw err;
    });
  // Endpoint: /filter.php?c={category}
  // Retorna: lista de receitas da categoria (sem detalhes completos)
  // TODO
}

async function fetchRandomRecipe() {
  return fetch(`${BASE_URL}/random.php`)
    .then((res) => res.json())
    .then((data) => data.meals[0]);
}

// o endpoint devolve uma receita por chamada e pode repetir; completa até ter `count` diferentes
export async function fetchRandomRecipes(count) {
  const recipes = new Map();
  for (let attempt = 0; attempt < 3 && recipes.size < count; attempt++) {
    const missing = count - recipes.size;
    const batch = await Promise.all(
      Array.from({ length: missing }, fetchRandomRecipe),
    );
    batch.forEach((recipe) => recipes.set(recipe.idMeal, recipe));
  }
  return [...recipes.values()];
}

export async function fetchRecipesDetails(category) {
  return fetch(`${BASE_URL}/lookup.php?i=${category}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => data.meals)
    .catch((err) => {
      throw err;
    });
}
