import { createSlice } from "@reduxjs/toolkit";
import { ProductInCart } from "../types/types";

const initialState: ProductInCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      return [];
    },

    resetQuantity(state, action) {
      const itemId = action.payload;
      return state.filter((item) => item.id !== itemId);
    },
    removeItem(state, action) {
      const itemId = action.payload;

      const itemInCart = state.find((item) => item.id === itemId);
      if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--;
      } else {
        return state.filter((item) => item.id !== itemId);
      }
    },

    addItem(state, action) {
      console.log(action);
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity(state, action) {
      console.log(action);
      const itemInCart = state.find((item) => item.id === action.payload);
      if (itemInCart) {
        itemInCart.quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload);
      if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--;
      }
    },
    
  },
});

export const {
  clearCart,
  resetQuantity,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
