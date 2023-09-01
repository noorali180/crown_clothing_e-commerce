import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CardItem from "../cart-item/cart-item.component";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CardItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Link to="/checkout">
        <Button onClick={() => setIsCartOpen()}>Go To Checkout</Button>
      </Link>
    </div>
  );
};

export default CartDropDown;
