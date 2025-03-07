//дефолтное значение, которое будет в самом начале
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItemsType = {
  id: string;
  title: string;
  price: number;
  image: string;
  type: string;
  sizes: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemsType[];
  //items это массив карт айтема
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemsType>) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      //price * count
    },

    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    minusItems(state, action: PayloadAction<string>) {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems?.count !== 0) {
        if (findItems) {
          findItems.count--;
        }
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      if (findItems?.count === 0) {
        if (window.confirm("DELETE? you sure?")) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
//selector for cart state
export const getCartItemsByIdSelector = (id: string) => (state: RootState) =>
  //данный state - это весь редакс. Это не тот stat, чтос сверху
  state.cart.items.find((obj) => obj.id === id);

export const { addItems, removeItems, clearItems, minusItems } =
  cartSlice.actions;

export default cartSlice.reducer;
