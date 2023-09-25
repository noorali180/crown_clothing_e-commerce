import { CART_ACTIONS } from "./cart.types";

export const setIsCartOpen = (bool) => {
  return { type: CART_ACTIONS.TOGGLE_IS_CART_OPEN, payload: bool };
};

export const addItemToCart = (cartItems, product) => {
  const newCartItems = checkCartItems(cartItems, product);

  return { type: CART_ACTIONS.SET_CART_ITEMS, payload: newCartItems };
};

export const decreaseCartItemQuantity = (cartItems, itemToDecrease) => {
  const newCartItems = checkCartItemToDecrease(cartItems, itemToDecrease);

  return { type: CART_ACTIONS.SET_CART_ITEMS, payload: newCartItems };
};

export const removeCartItem = (cartItems, itemToRemove) => {
  const newCartItems = checkCartItemToRemove(cartItems, itemToRemove);

  return { type: CART_ACTIONS.SET_CART_ITEMS, payload: newCartItems };
};

///////////////////////// UTILITY FUNCTIONS ///////////////////////////////////

const checkCartItems = (cartItems, itemToAdd) => {
  // check if cartItem already exist in the cartItems list.
  const existingItem = cartItems?.find((item) => item.id === itemToAdd.id);

  // if yes then increment quantity of te item by 1, and return new array of items.
  if (existingItem) {
    return cartItems?.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  // if no then add item to list of items, then return the list.
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const checkCartItemToDecrease = (cartItems, cartItemToDecrease) => {
  // check if item exists,
  const existingItem = cartItems?.find(
    (item) => item.id === cartItemToDecrease.id
  );
  // if quantity is not equal to 1 than decrease it,
  if (existingItem && existingItem.quantity > 1) {
    return cartItems?.map((item) =>
      item.id === cartItemToDecrease.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cartItems;
};

const checkCartItemToRemove = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems?.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingItem) {
    return cartItems?.filter((item) => item.id !== cartItemToRemove.id);
  }
};
