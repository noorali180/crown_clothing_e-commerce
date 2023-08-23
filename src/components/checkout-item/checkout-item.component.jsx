import "./checkout-item.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ checkoutItem }) => {
    const {name, imageUrl, quantity, price} = checkoutItem
  const { addItemToCart, decreaseCartItemQuantity, removeCartItem } =
    useContext(CartContext);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseCartItemQuantity(checkoutItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => addItemToCart(checkoutItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{`$ ${price}`}</span>
      <div
        className="remove-button"
        onClick={() => removeCartItem(checkoutItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
