import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) {
            i.quantity += 1;
          }
        });
      } else {
        state.cartItems.push(item);
      }
    },

    decrement: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    calculatePrice: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => {
        sum += i.price * i.quantity;
      });
      state.subtotal = sum;
      state.shipping =
        state.cartItems.length === 0 || state.subtotal > 1000 ? 0 : 200;
      state.tax = +(state.subtotal * 0.18).toFixed();
      state.total = state.subtotal + state.shipping + state.tax;
    },
  }
);
