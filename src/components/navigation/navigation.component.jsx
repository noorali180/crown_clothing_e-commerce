import { Fragment } from "react";
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/logo.svg";

import { Link, Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firbase/firbase.util";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
