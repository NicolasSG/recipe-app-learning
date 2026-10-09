function Card({ id, title, image, modalFunction }) {
  return (
    <div key={id} className="recipe" onClick={modalFunction}>
      <h3 className="recipe__title">{title}</h3>
      <img className="recipe__img" src={image} alt="" />
      <button
        type="button"
        className="recipe__button"
        onClick={(e) => {
          e.stopPropagation();
          modalFunction();
        }}
      >
        Abrir receita
      </button>
    </div>
  );
}

export default Card;
