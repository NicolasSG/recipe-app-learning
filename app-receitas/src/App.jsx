import { useEffect, useState, useContext } from "react";
import "./App.css";
import {
  fetchCategories,
  fetchRecipesByName,
  fetchRecipesByCategory,
  fetchRecipesDetails,
} from "../src/utils.js";
import Card from "./components/Card.jsx";
import Categories from "./components/Categories.jsx";
import { Toaster, toast } from "react-hot-toast";
import CardSkeleton from "./components/CardSkeleton.jsx";
import CardModal from "./components/CardModal.jsx";
import { RecipesContext } from "./context/RecipesContext.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  const { categories } = useContext(RecipesContext);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [startRecipe, setStartRecipe] = useState(false);

  async function recipeDetails(recipes) {
    const res = await fetchRecipesDetails(recipes.idMeal);
    setSelectedRecipe(res[0]);
    const stored = localStorage.getItem(
      `app-receitas.recipe.${recipes.idMeal}`,
    );
    setStartRecipe(stored !== null); //esse stored estar aqui no App.jsx foi a IA que botou, não consegui resolver lá no CardModal
  }

  // uso correto o try catch? Ou tem uma forma melhor?
  //essas async function tem que estar dentro do useEffect?
  async function searchRecipes() {
    try {
      setRecipes([]);
      setSelectedCategorie(null);
      setLoading(true);
      const res = await fetchRecipesByName(searchTxt);
      res === null
        ? toast.error("Nenhum resultado encontrado")
        : setRecipes(res);
    } catch (err) {
      toast.error("Erro de conexão, tente novamente");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    setSearchTxt(event.target.value);
  }

  function handleSearchClick(e) {
    e.preventDefault();
    searchTxt ? searchRecipes() : toast.error("ERRO FATAL");
  }

  function handleCloseModal() {
    setSelectedRecipe("");
    setStartRecipe(false);
  }

  // uso correto o try catch? Ou tem uma forma melhor?
  async function handleCategorieButton(categorieName) {
    try {
      setRecipes([]);
      setLoading(true);
      const res = await fetchRecipesByCategory(categorieName);
      setRecipes(res);
      setSelectedCategorie(categorieName);
    } catch (err) {
      toast.error("Erro de conexão, tente novamente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={selectedRecipe ? "overlay" : ""}
        onClick={handleCloseModal}
      ></div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e2f",
            color: "#fff",
          },
          success: {
            style: { background: "#16a34a", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#16a34a" },
          },
          error: {
            style: { background: "#dc2626", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#dc2626" },
          },
        }}
      />
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">
            <span className="header__icon">🍽️</span>
            Receitas do Mundo
          </h1>
          <p className="header__subtitle">
            Explore receitas de qualquer lugar do planeta
          </p>
        </div>
      </header>

      <main className={"main"}>
        <section className="search-section">
          <form className="search-wrapper">
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Buscar receita... ex: pasta, chicken, soup"
              aria-label="Campo de busca de receitas"
              value={searchTxt}
              onChange={handleChange}
              required
            />
            {/*isso tá ok?*/}
            {searchTxt.length > 0 && searchTxt.length < 3 && (
              <span className="search__error-msg">
                Digite pelo menos 3 caracteres
              </span>
            )}
            <button
              id="search-btn"
              className="search-btn"
              aria-label="Buscar"
              onClick={handleSearchClick}
              disabled={searchTxt.length > 0 && searchTxt.length < 3}
            >
              Buscar
            </button>
          </form>
        </section>

        {/* <!-- Filtros de categoria --> */}
        <section className="categories-section">
          <h2 className="section-title">Categorias</h2>
          <div
            id="categories"
            className="categories"
            role="list"
            aria-label="Filtros por categoria"
          >
            {categories &&
              categories.map((categorie) => (
                <Categories
                  id={categorie.idCategory}
                  className={
                    selectedCategorie === categorie.strCategory
                      ? "categorie__button-active"
                      : ""
                  }
                  name={categorie.strCategory}
                  categorieFunction={() =>
                    handleCategorieButton(categorie.strCategory)
                  }
                />
              ))}
          </div>
        </section>

        {/* <!-- Grid de receitas --> */}
        <section className="recipes-section">
          <h2 id="recipes-title" className="section-title">
            Receitas
          </h2>
          {/* tentativa de adicionar um loading kkkkk */}
          {loading && <CardSkeleton />}
          <div
            id="recipes-grid"
            className="recipes-grid"
            role="list"
            aria-label="Lista de receitas"
          >
            {recipes.map((recipe) => (
              <Card
                id={recipe.idMeal}
                title={recipe.strMeal}
                image={recipe.strMealThumb}
                modalFunction={() => {
                  recipeDetails(recipe);
                }}
              />
            ))}
          </div>
        </section>
        <section>
          {selectedRecipe && (
            <CardModal
              recipe={selectedRecipe}
              handleCloseModal={handleCloseModal}
              setStartRecipe={setStartRecipe}
              startRecipe={startRecipe}
            />
          )}
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">
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
