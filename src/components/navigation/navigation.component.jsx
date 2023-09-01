import "./navigation.styles.scss";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/logo.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firbase/firbase.util";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartDropDown = () => {
    setIsCartOpen();
  };

  const signOutUserHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <Fragment>
      <header className="navigation">
        <div className="navigation-logo-container">
          <Link to="/" className="navigation-logo">
            <CrwnLogo />
          </Link>
        </div>
        <nav className="navigation-links-container">
          <Link to="/shop" className="navigation-link">
            shop
          </Link>
          <Link to="/contacts" className="navigation-link">
            contacts
          </Link>

          {currentUser ? (
            <span className="navigation-link" onClick={signOutUserHandler}>
              sign out
            </span>
          ) : (
            <Link to="/authentication" className="navigation-link">
              sign in
            </Link>
          )}

          <CartIcon onClick={toggleCartDropDown} itemCount={cartCount}/>
        </nav>
        {isCartOpen && <CartDropDown />}
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
