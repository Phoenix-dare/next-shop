import { createSlice } from "@reduxjs/toolkit";


interface ShippingInfo{
  
address: string,
city: string,
state: string,
country: string,
pinCode: number,
phoneNo: number,
total:number,
totalPayable:number,
tax:number,
shippingCost:number
}
const initialState:ShippingInfo={
  
  address: "",
  city: "",
  state: "",
  country: "",
  pinCode: 0,
  phoneNo: 0,
  total:0,
  totalPayable:0,
  tax:0,
  shippingCost:0,
  }

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveShippingInfo(state,action){
      return{... action.payload}
    }
  },
});

export const {
    saveShippingInfo
} = orderSlice.actions;

export default orderSlice.reducer;
