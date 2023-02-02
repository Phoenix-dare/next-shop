import React, { useEffect } from "react";
import { useSelector, useDispatch, ReactReduxContextValue } from "react-redux";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../features/cartSlice";
import { CldImage } from "next-cloudinary";
import { AppState } from "../app/store";
import router from "next/router";
import { useSession, signIn } from "next-auth/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart } = useSelector((state: AppState) => state);
  const { status } = useSession();

  console.log(cart);
  const dispatch = useDispatch();

  if (cart.length < 1) {
    return (
      <div className="container h-96 w-screen text-xl text-center">
        Uh Oh!! Your cart seems to be empty
        <ToastContainer />
      </div>
    );
  }
  return (
    <div className="h-full w-screen text-xl flex flex-col items-center ">
      <div className="text-2xl font-medium mb-4 dark:text-white">Your Cart</div>
      {cart?.map((item) => (
        <div key = {item.id} className="flex my-4 border-2 w-96">
          <div className="w-1/4">
            <CldImage
              width="150"
              height="150"
              crop="thumb"
              src={`img-folder/${item.images[0].public_id}`}
              alt={item.name}
            />
          </div>
          <div className="w-3/4 flex flex-col px-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-white">
              {item.name}
            </h3>
            <p className="text-lg font-medium text-gray-700 dark:text-white">
              Price: {item.price}
            </p>
            <div className="flex  flex-col items-center ">
              <div className="flex flex-row">
                <button
                  className="bg-gray-500 dark:bg-gray-200  text-black m-2  border-2 py px-2 rounded-3xl "
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </button>
                <p className="text-lg font-medium">{item.quantity}</p>
                <button
                  className="bg-gray-500 dark:bg-gray-200 text-black py px-2
                 rounded-3xl m-2 border-2"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  -
                </button>
              </div>
              <div className="flex flex-row">
                <div
                  className="bg-red-500 text-white text-sm py px-4
                 rounded-3xl m-2 cursor-pointer"
                  onClick={() => {
                    dispatch(removeItem(item.id));
                    toast.warn("Item removed from cart");
                  }}
                >
                  Remove Item
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
        <span className="dark:text-white">
          Total:
          {cart.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )}
        </span>
      </div>
      <div
        className=" bg-blue-500 text-white text-sm py px-4 rounded-3xl m-2 cursor-pointer"
        onClick={() => {
          if (status === "authenticated") {
            router.push("/orders");
          }
          signIn();
        }}
      >
        Buy Now
      </div>
      <div
        className="bg-red-500 text-white text-sm py px-4
                 rounded-xl ml-2 cursor-pointer"
        onClick={() => {
          dispatch(clearCart());
          toast.warn("Your cart has been cleared");
        }}
      >
        Clear Cart
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
