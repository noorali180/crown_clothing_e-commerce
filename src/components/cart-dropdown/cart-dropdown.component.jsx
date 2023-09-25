import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CardItem from "../cart-item/cart-item.component";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

import {
  selectIsCartOpen,
  selectCartItems,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";

const CartDropDown = () => {
  // const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);

  const checkoutClickHandler = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((item) => {
          return <CardItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Link to="/checkout">
        <Button onClick={checkoutClickHandler}>Go To Checkout</Button>
      </Link>
    </div>
  );
};

export default CartDropDown;
