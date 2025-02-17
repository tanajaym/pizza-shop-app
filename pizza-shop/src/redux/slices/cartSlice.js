//дефолтное значение, которое будет в самом начале
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      state.items.push(action.payload);
    },

    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItems, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
