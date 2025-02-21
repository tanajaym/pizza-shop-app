//дефолтное значение, которое будет в самом начале
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk(
  "pizza/fetchPizza",
  async (params) => {
    const { category, search, sortType, currentPage } = params;
    const response = await axios.get(
      `https://6797b1f3c2c861de0c6daede.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=asc${search}`,
    );
    return response.data;
  },
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "OK";
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
