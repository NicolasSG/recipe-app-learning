function Categories({ name, categorieFunction, isActive }) {
  return (
    <button
      className={`categorie__button${isActive ? " categorie__button-active" : ""}`}
      aria-pressed={isActive}
      onClick={categorieFunction}
    >
      {name}
    </button>
  );
}

export default Categories;
