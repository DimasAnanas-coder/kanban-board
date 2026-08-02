function Card({ title, description, status }) {
  return (
    <div className="min-h-30 min-w-50 bg-white border border-gray-300">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  );
}

export default Card;