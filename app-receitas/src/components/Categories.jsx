function Categories({ id, name, categorieFunction, className }) {
  return (
    <button
      key={id}
      className={`${className} categorie__button`}
      onClick={categorieFunction}
    >
      {name}
    </button>
  );
}

export default Categories;
