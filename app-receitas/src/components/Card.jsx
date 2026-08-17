function Card({ id, title, image, modalFunction }) {
  return (
    <div key={id} className="recipe" onClick={modalFunction}>
      <h3 className="recipe__title">{title}</h3>
      <img className="recipe__img" src={image} alt="" />
    </div>
  );
}

export default Card;
