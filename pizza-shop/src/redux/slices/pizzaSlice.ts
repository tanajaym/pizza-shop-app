//дефолтное значение, которое будет в самом начале
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortType } from "./filterSlice";

export enum status {
  LOADING = "pending",
  OK = "fulfilled",
  FAILED = "rejected",
}

type PizzaItemsType = {
  id: string;
  title: string;
  price: number;
  image: string;
  type: number[];
  sizes: number[];
  count: number;
};

export type FetchParamsType = {
  category: string;
  search: string;
  sortType: string;
  currentPage: string;
};
//type FetchParamsType = Record<string, string>
//сокращенная запись. в <> значения <передается строка, там бдудут string>

interface PizzaSliceState {
  items: PizzaItemsType[];
  status: status;
}

export const fetchPizza = createAsyncThunk<PizzaItemsType[], FetchParamsType>(
  "pizza/fetchPizza",
  async (params) => {
    //FetchParamsType for params
    const { category, search, sortType, currentPage } = params;
    const response = await axios.get<PizzaItemsType[]>(
      // get вернет массив карт айтемов
      `https://6797b1f3c2c861de0c6daede.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=asc${search}`,
    );
    return response.data;
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItemsType[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = status.OK;
      })
      .addCase(fetchPizza.rejected, (state, action) => {
        state.status = status.FAILED;
        state.items = [];
      });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
