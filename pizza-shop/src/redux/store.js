import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/filterSlice";
import filter from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    filter,
  },
});

export default store;
