import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Navigation from "./components/navigation/navigation.component";
import Checkout from "./routes/checkout/checkout.component";
import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firbase/firbase.util";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // because it is an open listen, we have to force stop it from listening when it finished listening...
    // Note: no matter if page is refreshed,
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="authentication" element={<Authentication />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
