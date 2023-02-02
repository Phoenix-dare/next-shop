import { createSlice } from "@reduxjs/toolkit";
import { CategoryWithID } from "../types/types";

const initialState : CategoryWithID[]= []

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    allCategories(state, action) {
      return [...action.payload];
    },
  },
});

export const { allCategories } = categorySlice.actions;

export default categorySlice.reducer;
