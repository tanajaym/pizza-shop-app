//дефолтное значение, которое будет в самом начале
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    categoryId: 0;
    sort: {
        name: "популярности",
        sortProperty: "rating",
    }
};

const filterSlice = crearteSlice({
    name: 'filters',
    initialState,
    reducers:{
         setCategoryId(state, action){
             console.log(action);
            state.categoryId = action.payload;
         }
    }
})

export const {setCategoryId} = filterSlice.actions;

export default filterSlice.reducer;