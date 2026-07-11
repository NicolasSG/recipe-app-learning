function Card({ id, title, image }) {
  return (
    <div key={id}>
      <h3>{title}</h3>
      <img src={image} alt="" />
    </div>
  );
}

export default Card;
