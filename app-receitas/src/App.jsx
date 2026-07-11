import { useEffect, useState } from "react";
import "./App.css";
import { fetchCategories, fetchRecipesByName } from "../src/utils.js";
import Card from "./components/Card.jsx";
import Categories from "./components/Categories.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const res = await fetchRecipesByName("meat");
      setRecipes(res);
    }
    loadRecipes();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetchCategories();
      setCategories(res);
    }
    loadCategories();
  }, []);

  return (
    <>
      <header class="header">
        <div class="header__inner">
          <h1 class="header__title">
            <span class="header__icon">🍽️</span>
            Receitas do Mundo
          </h1>
          <p class="header__subtitle">
            Explore receitas de qualquer lugar do planeta
          </p>
        </div>
      </header>

      <main class="main">
        {/* /* Barra de busca */}
        <section class="search-section">
          <div class="search-wrapper">
            <input
              type="text"
              id="search-input"
              class="search-input"
              placeholder="Buscar receita... ex: pasta, chicken, soup"
              aria-label="Campo de busca de receitas"
            />
            <button id="search-btn" class="search-btn" aria-label="Buscar">
              Buscar
            </button>
          </div>
        </section>

        {/* <!-- Filtros de categoria --> */}
        <section class="categories-section">
          <h2 class="section-title">Categorias</h2>
          <div
            id="categories"
            class="categories"
            role="list"
            aria-label="Filtros por categoria"
          >
            {categories.map((categorie) => {
              <Categories
                id={categorie.idCategory}
                name={categorie.strCategory}
              />;
            })}
            {/* <!-- Gerado via JS --> */}
          </div>
        </section>

        {/* <!-- Estado: carregando --> */}
        <div id="loading" class="state-loading" hidden aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p>Buscando receitas...</p>
        </div>

        {/* <!-- Estado: erro --> */}
        <div id="error" class="state-error" hidden role="alert">
          <span class="state-error__icon">⚠️</span>
          <p id="error-message" class="state-error__message"></p>
          <button id="retry-btn" class="retry-btn">
            Tentar novamente
          </button>
        </div>

        {/* <!-- Estado: sem resultados --> */}
        <div id="empty" class="state-empty" hidden aria-live="polite">
          <span class="state-empty__icon">🔍</span>
          <p>Nenhuma receita encontrada.</p>
          <p class="state-empty__hint">Tente outro termo ou outra categoria.</p>
        </div>

        {/* <!-- Grid de receitas --> */}
        <section class="recipes-section">
          <h2 id="recipes-title" class="section-title">
            Receitas
          </h2>
          <div
            id="recipes-grid"
            class="recipes-grid"
            role="list"
            aria-label="Lista de receitas"
          >
            {recipes.map((recipe) => (
              <Card
                id={recipe.idMeal}
                title={recipe.strMeal}
                image={recipe.strMealThumb}
              />
            ))}
            {/* <!-- Gerado via JS --> */}
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>
          Dados fornecidos pela{" "}
          <a href="https://www.themealdb.com" target="_blank" rel="noopener">
            TheMealDB
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
