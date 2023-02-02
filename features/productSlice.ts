import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { ProductWithId } from "../types/types";
import { AppDispatch } from "../app/store";

const initialState : ProductWithId[]=[]
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProducts(state, action) {
      return [...action.payload]
    },
    changeRating(state,action) {
      const updatedProduct = action.payload
      return state.map((item) =>
          item.id === updatedProduct.data.id ? updatedProduct.data : item)
          
      
  },
  },
})
export const updateRating = (item:ProductWithId) => {
  return async (dispatch:AppDispatch) => {
   const product = await axios.put(
        `api/products/products/${item.id}`,
      item
      );
      dispatch(changeRating(product.data))
  }
}
export const { allProducts,changeRating} =
  productSlice.actions;

export default productSlice.reducer;
