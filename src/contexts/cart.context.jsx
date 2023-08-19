import { createContext, useState } from "react";

const checkCartItems = (cartItems, itemToAdd) => {
  // check if cartItem already exist in the cartItems list.
  const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

  // if yes then increment quantity of te item by 1, and return new array of items.
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id
        ? { ...item, quantity: item.quantity + 1} 
        : item
    );
  }

  // if no then add item to list of items, then return the list.
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(checkCartItems(cartItems, product));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };
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
