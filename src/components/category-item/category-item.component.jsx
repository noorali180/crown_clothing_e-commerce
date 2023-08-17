import "./categroy-item.styles.scss";
const CategroyItem = ({ category: { id, title, imageUrl } }) => {
  const large = title === "mens" || title === "womens" ? "large" : "";

  return (
    <div className={`category-container ${large}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategroyItem;
