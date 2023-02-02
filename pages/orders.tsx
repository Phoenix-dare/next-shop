import React, { useReducer, useState } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../features/orderSlice";
import { AppState } from "../app/store";
import router from "next/router";
import { z, ZodError } from "zod";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderPage: NextPage = () => {
  const dispatch = useDispatch();

  const [showAddress, setShowAddress] = useState(false);

  const { cart } = useSelector((state: AppState) => state);

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const shippingCost = total > 500 ? 0 : 50;
  const tax = +(total * 0.1).toFixed(2);
  const totalPayable = +(total + shippingCost + tax).toFixed(2);

  const AddressInput = z.object({
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .min(1, { message: "Street is required" }),
    city: z
      .string({
        required_error: "City is required",
        invalid_type_error: "City must be a string",
      })
      .min(1, { message: "City is required" }),
    state: z
      .string({
        required_error: "State is required",
        invalid_type_error: "State must be a string",
      })
      .min(1, { message: "State is required" }),
    country: z
      .string({
        required_error: "Country is required",
        invalid_type_error: "Country must be a string",
      })
      .min(1, { message: "Country is required" }),
    pinCode: z
      .string({
        required_error: "Pincode is required",
        invalid_type_error: "Pincode must be a number",
      })
      .length(6,{ message: "Pincode must be length of 6" }),
    phoneNo: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone number must be a number",
      })
      .length(10,{ message: "Phone number must be length of 10" }),
  });

  type AddressObject = z.infer<typeof AddressInput>;
  interface ActionType {
    type: string;
    value: AddressObject[keyof AddressObject];
    name: keyof AddressObject;
  }

  const initialState: AddressObject = {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  };

  const orderReducer = (state: AddressObject, action: ActionType) => {
    switch (action.type) {
      case "change":
        return { ...state, [action.name]: action.value };
      case "reset":
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatchOrder] = useReducer(orderReducer, initialState);

  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatchOrder({
      type: "change",
      name: e.currentTarget.name as keyof AddressObject,
      value: e.currentTarget.value,
    });
  };

  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    try {
      AddressInput.parse(state);
      setShowAddress(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        const messages= err.issues.map(e=>e.message).join(", ")
        console.log(messages);
        toast.warn(messages,{autoClose: 5000})
      }
    }
  };

  const handleCheckout = () => {
    const shippingInfo = {
      ...state,
      total,
      totalPayable,
      tax,
      shippingCost,
    };

    dispatch(saveShippingInfo(shippingInfo));
    router.push("/checkout");
  };

  return (
    <div className="container p-6 mx-auto">
      {!showAddress && (
        <form
          className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
          <div className="mb-4 flex-1">
            <label className="block font-medium mb-2">
              Address:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="address"
                value={state.address}
                onChange={handleChange}
              />
            </label>
            <label className="block font-medium mb-2">
              City:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="city"
                value={state.city}
                onChange={handleChange}
              />
            </label>
            <label className="block font-medium mb-2">
              State:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="state"
                value={state.state}
                onChange={handleChange}
              />
            </label>
            <label className="block font-medium mb-2">
              Country:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="country"
                value={state.country}
                onChange={handleChange}
              />
            </label>
            <label className="block font-medium mb-2">
              Pin Code:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="pinCode"
                value={state.pinCode}
                onChange={handleChange}
              />
            </label>
            <label className="block font-medium mb-2">
              Phone Number:
              <input
                className="form-input rounded-md mt-1 w-full border-2"
                type="text"
                name="phoneNo"
                value={state.phoneNo}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
              type="submit"
            >
              Save Address
            </button>
          </div>
        </form>
      )}
      <div className="container mx-auto my-12">
        <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg">
          {showAddress ? (
            <div>
              <p className="text-lg font-medium mb-2">
                Address: {state.address}
              </p>
              <p className="text-lg font-medium mb-2">City: {state.city}</p>
              <p className="text-lg font-medium mb-2">State: {state.state}</p>
              <p className="text-lg font-medium mb-2">
                Country: {state.country}
              </p>
              <p className="text-lg font-medium mb-2">
                Pin Code: {state.pinCode}
              </p>
              <p className="text-lg font-medium mb-2">
                Phone No: {state.phoneNo}
              </p>
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-4"
                onClick={() => setShowAddress(false)}
              >
                Edit
              </button>
            </div>
          ) : (
            <p className="text-lg font-medium mb-2">No address saved.</p>
          )}
        </div>
        <div className="flex flex-col items-center my-6">
          <p className="text-xl font-medium mb-2">Order Summary</p>
          <p className="text-lg font-medium mb-2">Total Amount: {total}</p>
          <p className="text-lg font-medium mb-2">Shipping: {shippingCost}</p>
          <p className="text-lg font-medium mb-2">Tax: {tax}</p>
          <p className="text-lg font-medium mb-2">
            Total Payable: {totalPayable}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
            onClick={handleCheckout}
          >
            Proceed to pay
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={() => router.push("/cart")}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderPage;
