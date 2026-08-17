// context/RecipesProvider.jsx
import { useState, useEffect } from "react";
import { RecipesContext } from "./RecipesContext";
import {
  fetchRecipesByName,
  fetchCategories,
  fetchRecipesByCategory,
  fetchRecipesDetails,
} from "../utils";

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadCategories();
  }, []);

  async function searchByName(name) {
    try {
      setLoading(true);
      const data = await fetchRecipesByName(name);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function filterByCategory(category) {
    try {
      setLoading(true);
      const data = await fetchRecipesByCategory(category);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadRecipeDetails(id) {
    try {
      setLoading(true);
      const data = await fetchRecipesDetails(id);
      setSelectedRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(recipeId) {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId],
    );
  }

  const value = {
    recipes,
    categories,
    selectedRecipe,
    favorites,
    loading,
    error,
    searchByName,
    filterByCategory,
    loadRecipeDetails,
    toggleFavorite,
  };

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}
