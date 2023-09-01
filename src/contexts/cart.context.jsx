import { createContext, useReducer } from "react";

const checkCartItems = (cartItems, itemToAdd) => {
  // check if cartItem already exist in the cartItems list.
  const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

  // if yes then increment quantity of te item by 1, and return new array of items.
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  // if no then add item to list of items, then return the list.
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const checkCartItemToDecrease = (cartItems, cartItemToDecrease) => {
  // check if item exists,
  const existingItem = cartItems.find(
    (item) => item.id === cartItemToDecrease.id
  );
  // if quantity is not equal to 1 than decrease it,
  if (existingItem && existingItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === cartItemToDecrease.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cartItems;
};

const checkCartItemToRemove = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingItem) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }
};

//////////////////////////////////////////////////////////////////////

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseCartItemQuantity: () => {},
  removeCartItem: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const CART_ACTIONS = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTIONS.TOGGLE_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error("error in cartReducer");
  }
};

/////////////////////////////////////////////////////////////////

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [total, setTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartTotal, cartCount } = state;

  const updateCartReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch({
      type: CART_ACTIONS.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTIONS.TOGGLE_IS_CART_OPEN, payload: bool });
  };

  const addItemToCart = (product) => {
    const newCartItems = checkCartItems(cartItems, product);
    updateCartReducer(newCartItems);
  };

  const decreaseCartItemQuantity = (itemToDecrease) => {
    const newCartItems = checkCartItemToDecrease(cartItems, itemToDecrease);
    updateCartReducer(newCartItems);
  };

  const removeCartItem = (itemToRemove) => {
    const newCartItems = checkCartItemToRemove(cartItems, itemToRemove);
    updateCartReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseCartItemQuantity,
    removeCartItem,
    cartTotal,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/*
Product{
    id,
    name,
    price,
    imageUrl
}

cartItem{
    id,
    name,
    price,
    imageUrl,
    quantity
}
*/
