import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/filterSlice";
import filter from "./slices/filterSlice";

export default store = configureStore({
  reducer: {
    filter,
  },
});
