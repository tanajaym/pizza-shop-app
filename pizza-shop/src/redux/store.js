import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/filterSlice";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export default store;
