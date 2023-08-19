import { Fragment } from "react";
import "./cart-item.styles.scss";

const CardItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <Fragment>
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">{quantity} x ${price}</span>
      </div>
    </div>
    <hr className="cart-item-break-hr"/>

    </Fragment>
  );
};

export default CardItem;
