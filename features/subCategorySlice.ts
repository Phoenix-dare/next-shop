import { createSlice } from "@reduxjs/toolkit";
import { SubCategoryWithID } from "../types/types";

const initialState:SubCategoryWithID[]=[]
const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    allSubCategories(state, action) {
      return [...action.payload];
    },
  },
});

export const { allSubCategories } = subCategorySlice.actions;

export default subCategorySlice.reducer;
