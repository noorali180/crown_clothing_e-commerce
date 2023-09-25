import { createSlice } from "@reduxjs/toolkit";

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

//////////////////////////////////////////////////////////////////////////////////

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = checkCartItems(state.cartItems, action.payload);
    },
    decreaseCartItemQuantity(state, action) {
      state.cartItems = checkCartItemToDecrease(
        state.cartItems,
        action.payload
      );
    },
    removeCartItem(state, action) {
      state.cartItems = checkCartItemToRemove(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  decreaseCartItemQuantity,
  removeCartItem,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
