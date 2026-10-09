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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  const [recipes, setRecipes] = useState([]);
  const { categories } = useContext(RecipesContext);
  const [searchTxt, setSearchTxt] = useState("");
  const [showSearchError, setShowSearchError] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState("Beef");
  const [loading, setLoading] = useState(true);
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
    setShowSearchError(false);
  }

  function handleSearchClick(e) {
    e.preventDefault();
    if (searchTxt.length < 3) {
      setShowSearchError(true);
      return;
    }
    searchRecipes();
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

  // carrega a categoria Beef ao abrir a página
  useEffect(() => {
    fetchRecipesByCategory("Beef")
      .then(setRecipes)
      .catch(() => toast.error("Erro de conexão, tente novamente"))
      .finally(() => setLoading(false));
  }, []);

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
            <TextField
              id="outlined-search"
              type="search"
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "inherit",
                  color: "var(--color-input-text)",
                  fontSize: "14px",
                  textAlign: "center",
                },
                "& .MuiInputBase-input::placeholder": { fontSize: "13px" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "var(--color-white)",
                  borderRadius: "15px",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "var(--color-primary)" },
              }}
              placeholder="Buscar receita... ex: pasta, chicken, soup"
              inputProps={{ "aria-label": "Campo de busca de receitas" }}
              error={showSearchError}
              InputProps={{
                endAdornment: showSearchError && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="12" fill="var(--color-error)" />
                    <rect
                      x="10.8"
                      y="5.5"
                      width="2.4"
                      height="8"
                      rx="1.2"
                      fill="#fff"
                    />
                    <circle cx="12" cy="17.5" r="1.4" fill="#fff" />
                  </svg>
                ),
              }}
              value={searchTxt}
              onChange={handleChange}
              required
            />
            <span className="search__error-msg" role="alert">
              {showSearchError && "Digite pelo menos 3 caracteres"}
            </span>
            <button
              id="search-btn"
              className="search-btn"
              aria-label="Buscar"
              onClick={handleSearchClick}
            >
              Buscar
            </button>
          </form>
        </section>

        {/* <!-- Filtros de categoria --> */}
        <section className="categories-section">
          <h2 className="section-title section-heading">Categorias</h2>
          <div
            id="categories"
            className="categories"
            role="list"
            aria-label="Filtros por categoria"
          >
            {categories &&
              categories.map((categorie) => (
                <Categories
                  key={categorie.idCategory}
                  isActive={selectedCategorie === categorie.strCategory}
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
          <h2 id="recipes-title" className="section-title section-heading">
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
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/nicolas-sg-br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nicolas
          </a>
          {" · "}
          <a
            href="https://github.com/NicolasSG/recipe-app-learning"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <p className="footer-text">
          Dados fornecidos por{" "}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheMealDB
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
