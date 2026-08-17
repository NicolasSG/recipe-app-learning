import { useState } from "react";

function CardModal({ recipe, handleCloseModal, setStartRecipe, startRecipe }) {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(`app-receitas.recipe.${recipe.idMeal}`),
  );

  //Object.entries converte o objeto para array, assim o .map pode ser usado
  const ingredientList = Object.entries(recipe)
    .filter(([key, value]) => key.includes("strIngredient") && value)
    .map(([key, value]) => {
      return [value];
    });

  const measureList = Object.entries(recipe)
    .filter(([key, value]) => key.includes("strMeasure") && value)
    .map(([key, value]) => {
      return [value];
    });

  // essa parte de botar tudo dentro do useState foi coisa da IA, não consegui chegar nessa ideia sozinho
  const [checkedIngredients, setCheckedIngredients] = useState(() => {
    const stored = localStorage.getItem(`app-receitas.recipe.${recipe.idMeal}`);

    if (stored) {
      return JSON.parse(stored);
    }

    return ingredientList.map((item) => ({
      name: item.toString(),
      isChecked: false,
    }));
  });

  function updateLocalStorage(ingredient, id) {
    const toStorage = checkedIngredients.map((item) => {
      return item.name == ingredient
        ? {
            ...item,
            isChecked: !item.isChecked,
          }
        : item;
    });

    localStorage.setItem(
      `app-receitas.recipe.${id}`,
      JSON.stringify(toStorage),
    );
    setCheckedIngredients(toStorage);
  }

  function getChecked(ingredient) {
    return (
      checkedIngredients.find((item) => item.name == ingredient)?.isChecked ??
      false
    );
  }

  return (
    <div
      key={recipe.idMeal}
      className="recipe recipe__modal"
      onClick={handleCloseModal}
    >
      <button className="recipe__modal_close-button">X</button>
      <h3 className="recipe__title">{recipe.strMeal}</h3>
      <img className="recipe__img" src={recipe.strMealThumb} alt="" />
      <p>{recipe.strInstructions}</p>
      {visible && (
        <button
          className="recipe__start-button"
          onClick={(e) => {
            e.stopPropagation(); //evita fechar o modal
            setStartRecipe(true);
            setVisible(false);
          }}
        >
          Iniciar receita
        </button>
      )}
      {startRecipe && (
        <ul>
          <p className="recipe__ingredients-title">Ingredientes:</p>
          {ingredientList.map((ingredient, index) => (
            <li>
              <input
                type="checkbox"
                id={ingredient}
                value={ingredient}
                checked={getChecked(ingredient)}
                onChange={() => updateLocalStorage(ingredient, recipe.idMeal)}
                onClick={(e) => {
                  e.stopPropagation(); //evita fechar o modal
                  setStartRecipe(true);
                }}
              />
              <label
                for={ingredient}
              >{`${ingredient} (${measureList[index]})`}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default CardModal;
