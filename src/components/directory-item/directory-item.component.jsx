import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";

const CategroyItem = ({ category: { id, title, imageUrl, route } }) => {
  const large = title === "mens" || title === "womens" ? "large" : "";

  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);

  return (
    <div className={`directory-item-container ${large}`} onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategroyItem;
