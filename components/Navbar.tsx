import Link from "next/link";
import Auth from "./Auth";
import { useState } from "react";
import SearchBar from "./Searchbar";
import { TiShoppingCart } from "react-icons/ti";

import { useSelector } from "react-redux";
import { ProductInCart } from "../types/types";
import { AppState } from "../app/store";
import Image from "next/image";

const Navbar = () => {
  const { cart } = useSelector((state: AppState) => state);

  return (
    <nav className="relative bg-indigo-500 p-2 flex flex-row flex-wrap justify-between items-center h-auto w-screen position-sticky border-b-2 border-gray-800 dark:bg-gray-800 dark:border-b-2 dark:border-slate-400">
      <div className="py-2 m-auto sm:m-0">
        <Link href="/" className="text-white font-medium">
          <Image
            src="/logoc.png"
            alt="logo"
            width={100}
            height={50}
            className="border rounded-3xl px-2 py-1 m-2"
          />
        </Link>
      </div>

      <SearchBar />
      <div className="flex flex-row justify-between w-screen sm:w-fit justify-self-end">
        <div className="relative pt-4 pl-16">
          <Link href="/cart">
            <TiShoppingCart
              className="text-white cursor-pointer m-0"
              size={25}
            />
            {cart.length > 0 && (
              <span className="absolute bg-red-500 text-white text-xs -mt-3 ml-4 px-1.5 py-0.5 rounded-full">
                {cart.reduce(
                  (acc: number, val: ProductInCart) => acc + val.quantity,
                  0
                )}
              </span>
            )}
          </Link>
        </div>
        <div className="flex px-8">
          <Auth />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
