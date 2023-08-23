import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseCartItemQuantity: () => {},
  removeCartItem: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, item) => total+ item.quantity * item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(checkCartItems(cartItems, product));
  };

  const decreaseCartItemQuantity = (itemToDecrease) => {
    setCartItems(checkCartItemToDecrease(cartItems, itemToDecrease));
  };

  const removeCartItem = (itemToRemove) => {
    setCartItems(checkCartItemToRemove(cartItems, itemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseCartItemQuantity,
    removeCartItem,
    total
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
