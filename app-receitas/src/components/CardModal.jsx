import { useEffect, useRef, useState } from "react";

function CardModal({ recipe, handleCloseModal, setStartRecipe, startRecipe }) {
  const sideRef = useRef(null);

  // trava o scroll da página enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // fecha o modal com a tecla ESC
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") handleCloseModal();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleCloseModal]);

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
    <div key={recipe.idMeal} className="recipe recipe__modal">
      <div className="recipe__modal-main">
        <button
          className="recipe__modal_close-button"
          aria-label="Fechar"
          onClick={handleCloseModal}
        >
          X
        </button>
        <img
          className="recipe__modal-img"
          src={recipe.strMealThumb}
          alt=""
        />
        <div className="recipe__modal-body">
          <h3 className="recipe__modal-title">{recipe.strMeal}</h3>
          <div
            className={`recipe__start-wrapper${visible ? "" : " recipe__start-wrapper--hidden"}`}
          >
            <div className="recipe__start-inner">
              <button
                className="recipe__start-button"
                tabIndex={visible ? 0 : -1}
                onClick={() => {
                  // grava já ao iniciar, para a receita reabrir com os ingredientes visíveis
                  localStorage.setItem(
                    `app-receitas.recipe.${recipe.idMeal}`,
                    JSON.stringify(checkedIngredients),
                  );
                  setStartRecipe(true);
                  setVisible(false);
                  // em telas pequenas os ingredientes abrem embaixo: rola até eles quando a animação termina
                  if (window.matchMedia("(max-width: 720px)").matches) {
                    setTimeout(() => {
                      sideRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }, 650);
                  }
                }}
              >
                Iniciar receita
              </button>
            </div>
          </div>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
      <aside
        ref={sideRef}
        className={`recipe__modal-side${startRecipe ? " recipe__modal-side--open" : ""}`}
        aria-hidden={!startRecipe}
      >
        <div className="recipe__modal-side-inner">
          <p className="recipe__ingredients-title">Ingredientes</p>
          <ul className="recipe__ingredients-list">
            {ingredientList.map((ingredient, index) => (
              <li key={ingredient}>
                <input
                  type="checkbox"
                  id={ingredient}
                  value={ingredient}
                  checked={getChecked(ingredient)}
                  onChange={() => updateLocalStorage(ingredient, recipe.idMeal)}
                />
                <label
                  htmlFor={ingredient}
                >{`${ingredient} (${measureList[index]})`}</label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
export default CardModal;
