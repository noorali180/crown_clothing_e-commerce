import "./checkout-item.styles.scss";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import { decreaseCartItemQuantity, addItemToCart, removeCartItem } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";

const CheckoutItem = ({ checkoutItem }) => {
    const {name, imageUrl, quantity, price} = checkoutItem
  // const { addItemToCart, decreaseCartItemQuantity, removeCartItem } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => dispatch(decreaseCartItemQuantity(cartItems,checkoutItem))}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => dispatch(addItemToCart(cartItems, checkoutItem))}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{`$ ${price}`}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(removeCartItem(cartItems, checkoutItem))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
